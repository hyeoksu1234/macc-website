import { NextResponse } from 'next/server';
import { validateContactForm, sanitizeFormData, escapeHtml, ContactFormData } from '@/lib/sanitize';
import { rateLimit } from '@/lib/rate-limit';
import nodemailer from 'nodemailer';

// 속도 제한 설정
const limiter = rateLimit({
  interval: 60 * 1000, // 1분
  uniqueTokenPerInterval: 10 // 최대 요청 수
});

export async function POST(req: Request) {
  try {
    // 속도 제한 확인
    const remaining = await limiter.check(req);
    
    if (!remaining.success) {
      return NextResponse.json(
        { error: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.' },
        { 
          status: 429,
          headers: {
            'Retry-After': remaining.reset.toString(),
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // 요청 본문 파싱
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: '유효하지 않은 요청 형식입니다.' },
        { status: 400 }
      );
    }

    // 데이터 정리 및 유효성 검사
    const sanitizedData = sanitizeFormData<ContactFormData>(body as ContactFormData);
    const { isValid, errors } = validateContactForm(sanitizedData);

    if (!isValid) {
      console.log('유효성 검사 실패:', errors);
      console.log('받은 데이터:', sanitizedData);
      return NextResponse.json(
        { 
          error: '입력 데이터가 유효하지 않습니다.', 
          details: errors,
          receivedData: sanitizedData 
        },
        { status: 400 }
      );
    }

    const { name, email, phone, organization, service, workshop, message } = sanitizedData;

    // 워크숍 옵션 매핑 (ContactForm의 옵션과 일치)
    const workshopLabels: Record<string, string> = {
      'first-book-writing': '내 인생 첫 책 쓰기',
      'gallup-strengths': '갤럽 강점 프로그램',
      'interest-based-career': '흥미 기반 커리어 프로그램',
      'via-values-in-action': 'VIA(Values in Action)',
      'career-reading-club': '커리어 전문 독서 모임',
      'mental-management-skills': '멘탈 관리의 기술',
      'one-on-one-conversation': '1 on 1 대화 스킬',
      'listening-skills': '입으로 하는 경청',
      'secret-of-questions': '질문의 비밀',
      'connection-conversation': '연결의 대화법',
      'feedback-skills': '피드백',
      'business-mbti': '비즈니스 MBTI',
      'expert-self-branding': '전문가의 자기브랜딩'
    };

    // 이메일 전송 설정
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const adminEmail = process.env.ADMIN_EMAIL || 'leeyoon@ma-cc.co.kr';
    
    // 환경 변수가 없는 경우 콘솔에만 로그 남기고 성공 응답
    if (!emailUser || !emailPass) {
      console.log('이메일 설정이 없어 콘솔에만 로그를 남깁니다.');
      console.log('문의 접수됨:', {
        name: escapeHtml(name),
        email: escapeHtml(email),
        phone: phone ? escapeHtml(phone) : '미입력',
        organization: organization ? escapeHtml(organization) : '미입력',
        service: escapeHtml(service),
        workshop: workshop ? workshopLabels[workshop] || escapeHtml(workshop) : '해당없음',
        message: escapeHtml(message)
      });
      
      return NextResponse.json(
        { message: '문의가 성공적으로 접수되었습니다. 곧 답변 드리겠습니다.' },
        { status: 200 }
      );
    }
    
    const transporter = nodemailer.createTransport({
      service: 'gmail', // 또는 다른 이메일 서비스
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      // TLS 설정 추가
      secure: true, // true면 TLS 사용
    });

    // 관리자에게 보내는 이메일 설정
    const adminMailOptions = {
      from: `"Masterpiece Alliance 웹사이트" <${emailUser}>`,
      to: adminEmail,
      subject: `[웹사이트 문의] ${escapeHtml(name)}님의 ${escapeHtml(service)} 문의`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0061ad;">Masterpiece Alliance 웹사이트 문의</h2>
          <p>다음 고객으로부터 문의가 접수되었습니다:</p>
          <hr style="border: 1px solid #eaeaea; margin: 20px 0;" />
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">이름:</td>
              <td style="padding: 8px 0;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">이메일:</td>
              <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #0061ad;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">연락처:</td>
              <td style="padding: 8px 0;">${phone ? escapeHtml(phone) : '미입력'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">소속:</td>
              <td style="padding: 8px 0;">${organization ? escapeHtml(organization) : '미입력'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">관심 서비스:</td>
              <td style="padding: 8px 0;">${escapeHtml(service)}</td>
            </tr>
            ${workshop ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">희망 워크숍:</td>
              <td style="padding: 8px 0;">${workshopLabels[workshop] || escapeHtml(workshop)}</td>
            </tr>
            ` : ''}
          </table>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">문의 내용:</h3>
            <p style="white-space: pre-line;">${escapeHtml(message)}</p>
          </div>
          
          <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">
            본 메일은 Masterpiece Alliance 웹사이트의 문의 양식을 통해 자동 발송되었습니다.
          </p>
        </div>
      `,
    };

    // 고객에게 자동 회신 이메일 설정
    const customerMailOptions = {
      from: `"Masterpiece Alliance" <${emailUser}>`,
      to: email,
      subject: `[Masterpiece Alliance] 문의가 접수되었습니다`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0061ad;">문의가 접수되었습니다</h2>
          <p><strong>${escapeHtml(name)}</strong>님, Masterpiece Alliance에 문의해 주셔서 감사합니다.</p>
          <p>귀하의 ${escapeHtml(service)} 관련 문의가 성공적으로 접수되었습니다.</p>
          ${workshop ? `<p>요청하신 워크숍: <strong>${workshopLabels[workshop] || escapeHtml(workshop)}</strong></p>` : ''}
          <p>담당자가 검토 후 빠른 시간 내에 연락드리겠습니다.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">문의 내용:</h3>
            <p style="white-space: pre-line;">${escapeHtml(message)}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea;">
            <p style="margin: 5px 0;"><strong>Masterpiece Alliance</strong></p>
            <p style="margin: 5px 0;">문의: <a href="mailto:leeyoon@ma-cc.co.kr" style="color: #0061ad;">leeyoon@ma-cc.co.kr</a></p>
            <p style="margin: 5px 0;">전화: <a href="tel:+821034065414" style="color: #0061ad;">010-3406-5414</a></p>
            <p style="margin: 5px 0;">웹사이트: <a href="https://www.ma-cc.co.kr" style="color: #0061ad;">www.ma-cc.co.kr</a></p>
          </div>
        </div>
      `,
    };

    try {
      // 이메일 전송 - 관리자
      await transporter.sendMail(adminMailOptions);
      
      // 이메일 전송 - 고객 자동 회신
      await transporter.sendMail(customerMailOptions);
      
      console.log('이메일 전송 성공:', adminEmail);
    } catch (error) {
      console.error('이메일 전송 오류:', error);
      return NextResponse.json(
        { error: '메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: '문의가 성공적으로 접수되었습니다. 곧 답변 드리겠습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('문의 처리 오류:', error);
    return NextResponse.json(
      { error: '문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
} 