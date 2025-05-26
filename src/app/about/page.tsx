'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  // 카드 플립 상태 관리
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg 브레이크포인트 기준
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 임시 핵심 가치 데이터
  const coreValues = [
    {
      id: 1,
      title: "전문성",
      description: "다년간의 경험과 전문지식을 바탕으로 최상의 코칭 서비스를 제공합니다.",
      icon: "🎯"
    },
    {
      id: 2,
      title: "신뢰",
      description: "고객과의 신뢰 관계를 최우선으로 생각하며, 정직하고 투명한 소통을 지향합니다.",
      icon: "🤝"
    },
    {
      id: 3,
      title: "혁신",
      description: "변화하는 시대에 맞춰 지속적으로 새로운 접근법과 방법론을 개발합니다.",
      icon: "💡"
    },
    {
      id: 4,
      title: "성장",
      description: "고객의 지속적인 성장과 발전을 위해 실질적인 변화를 이끌어냅니다.",
      icon: "🌱"
    }
  ];

  // 전문가 팀 멤버 데이터
  const teamMembers = [
    {
      id: 1,
      name: "이윤",
      role: "브랜드 성장 전략 주치의 & 자기다움 브랜딩 코칭",
      bio: "자기다움으로 탁월하게 행복한 이윤을 창출하도록 돕습니다.",
      credentials: [
        "국제코치연맹 PCC 코치 & 한국코치협회 KPC 프로 코치",
        "미국 갤럽 인증 강점코치",
        "ICCS_CCCS 1급",
        "MBTI 글로벌 전문가 & STRONG 직업흥미 전문코치",
        "직장 괴롭힘(존중 리더십) 전문 코치",
        "비즈니스 커뮤니케이션 전문가",
      
      ],
      imageUrl: "/images/team/lee-yoon.jpg"
    },
    {
      id: 2,
      name: "조원섭",
      role: "차별화 브랜딩 전문가 / 강점 기반 브랜딩 코치",
      bio: "강점과 자기다움을 통해 브랜드워커로 거듭나도록 돕습니다.",
      credentials: [
        "한국코치협회 KPC 프로 코치",
        "미국 갤럽 인증 강점코치",
        "MBTI 글로벌 전문가 & STRONG 직업흥미 전문가",
        "리더십 멘탈 케어 전문가(마음 챙김 프로그램)",
        "Global Executive Leadership Mirror ® (GELM) Certified 전문가"
      ],
      imageUrl: "/images/team/cho-wonseop.jpg"
    },
    {
      id: 3,
      name: "최승영",
      role: "실전 경험경력자원화 전문가 / 은퇴 후의 삶 설계, 리더십, 책 쓰기",
      bio: "드러나지 않은 숨은 자아를 만나 자신의 잠재력을 극대화합니다.",
      credentials: [
        "국제코치연맹 PCC 코치 & 한국코치협회 KPC 코치",
        "미국 갤럽 인증 강점코치",
        "직장 괴롭힘(존중 리더십) 전문 코치",
        "도형심리 GeoPiA 1급",
        "감정 코칭 전문가",
        "명상심리상담사",
        "명상지도사"
      ],
      imageUrl: "/images/team/choi-seungyoung.jpg"
    }
  ];

  // 스크롤 이벤트 핸들러 (모바일에서만 동작)
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      cardRefs.current.forEach((cardRef, index) => {
        if (cardRef) {
          const rect = cardRef.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const cardCenter = rect.top + rect.height / 2;
          const isInViewport = cardCenter >= windowHeight * 0.3 && cardCenter <= windowHeight * 0.7;
          
          const memberId = teamMembers[index]?.id;
          if (memberId) {
            if (isInViewport && !flippedCards.includes(memberId)) {
              setFlippedCards(prev => [...prev, memberId]);
            } else if (!isInViewport && flippedCards.includes(memberId)) {
              setFlippedCards(prev => prev.filter(id => id !== memberId));
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener('scroll', handleScroll);
  }, [flippedCards, teamMembers, isMobile]);

  // 카드 클릭/호버 핸들러 (웹에서만 동작)
  const handleCardInteraction = (memberId: number) => {
    if (isMobile) return;
    
    setFlippedCards(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 - 모바일 최적화 */}
      <section className="relative w-full h-[25vh] sm:h-[30vh] md:h-[40vh] flex items-center bg-white">
        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col items-center text-center">
            {/* 로고 영역 */}
            <div className="mb-4 sm:mb-6">
              <div className="mb-4 sm:mb-6">
                <Image
                  src="/og-image.png"
                  alt="Masterpiece Alliance Logo"
                  width={600}
                  height={300}
                  className="h-32 sm:h-40 md:h-52 lg:h-64 xl:h-72 w-auto mx-auto mb-4"
                />
              </div>
              {/* <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-gray-800 break-keep">
                Masterpiece Alliance
              </h1> */}
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold italic max-w-4xl text-gray-800 break-keep">
              개인과 조직의 지속가능한 성장을 위한 참 좋은 파트너
            </p>
          </div>
        </div>
      </section>

      {/* 소개 본문 - 모바일 최적화 */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-base sm:prose-lg md:prose-xl max-w-none">
              <div className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed space-y-6 sm:space-y-8">
                <p className="break-keep">
                  Masterpiece Alliance는 개인과 조직의 행복을 위해 함께 손잡고 걷는 동반의 가치를 지향합니다.<br className="hidden sm:block"/>
                  단순히 고객 혹은 고객사의 발전이라는 결과에만 집중하지 않습니다. 
                  결과를 만드는 과정에도 큰 무게를 두는 것은, <strong className="text-[#0061ad]">명작(Masterpiece)을 만들기 위해
                  함께 만드는(Alliance) 가치가 지속가능한 발전을 만든다</strong>는 <br className="hidden sm:block" /> 믿음이 있기 때문입니다.
                </p>

                <p className="break-keep">
                  그래서 Masterpiece Alliance의 모든 시작은 고객의 마음을 듣는 <strong className="text-[#0061ad]">'경청'</strong>에서 시작됩니다. 
                  Masterpiece Alliance가 <strong className="text-[#0061ad]">코칭과 컨설팅이 가진 장점을 융합하여</strong> 
                  만들어 가는 특별한 MA만의 솔루션에 고객을 초대합니다.
                </p>

                {/* 첫 번째 이미지 - 모바일 최적화 */}
                <div className="my-8 sm:my-12">
                  <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop"
                      alt="Masterpiece Alliance 솔루션"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>

                <p className="break-keep">
                  Masterpiece Alliance는 <strong className="text-[#0061ad]">코칭, 컨설팅, 브랜딩, 마케팅, 콘텐츠, 디자인</strong> 등 
                  각 분야의 전문가 그룹으로 구성되어 있습니다. 
                  모든 사람의 생각이 다르다는 것을 <strong className="text-[#0061ad]">인정하고 존중</strong>하며, 
                  그 안에서 예상하지 못했던 다른 해법을 찾는 놀라움을 경험하고 있습니다.
                </p>

                <p className="break-keep">
                  그것은 Masterpiece Alliance가 고객을 <strong className="text-[#0061ad]">존재(Being)로 대하는 기반</strong>이 됩니다. 
                  Masterpiece Alliance는 신중년의 커리어 개발, 지역 경제를 살리는 로컬 브랜딩, 
                  비즈니스의 성장을 위한 조직 개발은 물론 멤버십으로 운영되는 Masterpiece Career Society 등 
                  다양한 서비스를 제공하고 있습니다.
                </p>

                {/* 두 번째 이미지 - 모바일 최적화 */}
                <div className="my-8 sm:my-12">
                  <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop"
                      alt="다양성과 존중"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>

                <p className="text-lg sm:text-xl md:text-2xl font-medium text-[#0061ad] text-center py-6 sm:py-8 break-keep">
                  함께 만드는 지속가능한 발전을 위해 노력하는 Masterpiece Alliance는 여러분의 참 좋은 파트너입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 미션, 비전, 전략, 핵심가치 섹션 - 모바일 최적화 */}
      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-0">
                우리의 철학
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-0">
                Masterpiece Alliance의 미션, 비전, 전략, 핵심가치를 소개합니다
              </p>
              
              {/* 추가된 철학 문구 - 모바일 최적화 */}
              <p className="text-base sm:text-xl md:text-3xl font-bold text-[#0061ad] max-w-6xl mx-auto mt-6 sm:mt-8 break-keep">
                고객의 정체성에 기반하여 마켓보다 반 박자 빠르게, 지속가능하게!
              </p>
            </div>

            {/* 피라미드 이미지 */}
            <div className="flex justify-center">
              <Image
                src="/images/mission-vision-pyramid.png"
                alt="미션, 비전, 전략, 핵심가치 피라미드"
                width={1600}
                height={1200}
                className="w-full max-w-none h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 전문가 프로필 섹션 - 모바일 최적화 */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 break-keep">
                우리의 전문가
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto break-keep">
                각 분야의 전문 지식과 풍부한 경험을 바탕으로 여러분의 성장을 지원하는 전문가들을 소개합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {teamMembers.map((member, index) => {
                const isFlipped = flippedCards.includes(member.id);
                return (
                  <div 
                    key={member.id} 
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className={`group relative h-[400px] sm:h-[450px] lg:h-[500px] ${!isMobile ? 'cursor-pointer' : ''}`}
                    style={{ perspective: '1000px' }}
                    onClick={() => handleCardInteraction(member.id)}
                    onMouseEnter={() => !isMobile && handleCardInteraction(member.id)}
                    onMouseLeave={() => !isMobile && handleCardInteraction(member.id)}
                  >
                    <div 
                      className="relative w-full h-full transition-transform duration-700"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                      }}
                    >
                    
                    {/* 앞면 - 사진 */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-lg"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                        <h3 className="text-xl sm:text-2xl font-bold mb-1 break-keep">
                          {member.name}
                        </h3>
                        <p className="text-sm sm:text-base opacity-90 break-keep">
                          {member.role}
                        </p>
                  </div>
                    </div>
                    
                    {/* 뒷면 - 정보 */}
                    <div 
                      className="absolute inset-0 w-full h-full bg-white rounded-xl shadow-lg p-2 sm:p-3 flex flex-col justify-between"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className="text-center mb-4 mt-8">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-3 break-keep">
                          {member.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#0061ad] font-semibold break-keep line-clamp-2 mb-2">
                          {member.role}
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed break-keep">
                      {member.bio}
                    </p>
                      </div>

                      <div className="ml-2 mb-4">
                        <h4 className="text-sm sm:text-base font-semibold text-[#0061ad] uppercase tracking-wide mb-3">자격증 및 전문분야</h4>
                        <div className="h-[200px] sm:h-[220px] overflow-y-auto">
                          <ul className="space-y-1">
                            {member.credentials.map((credential, credIndex) => (
                              <li key={credIndex} className="text-sm sm:text-base text-gray-600 flex items-start break-keep">
                                <span className="text-[#0061ad] mr-2 flex-shrink-0 text-sm sm:text-base">•</span>
                                <span className="leading-relaxed">{credential}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 - 모바일 최적화 */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#0061ad] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 break-keep">
            여러분의 참 좋은 파트너
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto break-keep">
            Masterpiece Alliance와 함께 지속가능한 성장의 여정을 시작해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-[#0061ad] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              상담 신청하기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/services/main-biz"
              className="inline-flex items-center justify-center border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-[#0061ad] transition-colors duration-300"
            >
              Main Biz
            </Link>
            <Link
              href="/services/workshops"
              className="inline-flex items-center justify-center border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-[#0061ad] transition-colors duration-300"
            >
              전문 프로그램
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 