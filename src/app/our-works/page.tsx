import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function OurWorksPage() {
  // SVG 파일과 겹치는 로고를 정리한 로고 목록
  const clientLogos = [
    // 대기업 및 주요 기업
    { name: "삼성전자", src: "/images/logo_work/삼성전자.png" },
    { name: "LG전자", src: "/images/logo_work/lge_logo_kr_heritagered_grey_rgb.png" },
    { name: "LG그룹", src: "/images/logo_work/LG그룹.png" },
    { name: "현대자동차", src: "/images/logo_work/현대자동차.png" },
    { name: "현대백화점", src: "/images/logo_work/현대백화점.png" },
    { name: "한화그룹", src: "/images/logo_work/한화그룹.png" },
    { name: "롯데백화점", src: "/images/logo_work/롯데백화점.png" },
    { name: "롯데상사", src: "/images/logo_work/롯데상사.png" },
    { name: "LX세미콘", src: "/images/logo_work/LX세미콘.png" },
    { name: "DB하이텍", src: "/images/logo_work/DB하이텍.png" },
    { name: "TCC스틸", src: "/images/logo_work/TCC스틸.png" },
    { name: "GS건설", src: "/images/logo_work/GS건설.png" },
    { name: "만도", src: "/images/logo_work/만도.png" },
    { name: "HL만도", src: "/images/logo_work/HL만도.png" },
    { name: "금고타이어", src: "/images/logo_work/금호타이어.png" },
    { name: "ASM", src: "/images/logo_work/ASM.png" },
    
    // 금융 기업
    { name: "신한금융그룹", src: "/images/logo_work/신한금융그룹.png" },
    { name: "신한생명", src: "/images/logo_work/신한생명.png" },
    { name: "신한은행", src: "/images/logo_work/신한은행.png" },
    { name: "하나금융그룹", src: "/images/logo_work/하나금융그룹.png" },
    { name: "하나은행", src: "/images/logo_work/하나은행.png" },
    { name: "미래에셋", src: "/images/logo_work/미래에셋.png" },
    { name: "미래에셋생명", src: "/images/logo_work/미래에셋생명.png" },
    { name: "대신파이낸스그룹", src: "/images/logo_work/대신파이낸스그룹.png" },
    { name: "메트라이프", src: "/images/logo_work/메트라이프.png" },
    
    // 제약 및 헬스케어
    { name: "대웅제약", src: "/images/logo_work/대웅제약.png" },
    { name: "레디큐어", src: "/images/logo_work/레디큐어.png" },
    { name: "한국암웨이", src: "/images/logo_work/한국암웨이.png" },
    
    // IT 및 기술 기업
    { name: "텐센트코리아", src: "/images/logo_work/텐센트코리아.png" },
    { name: "넥스트유니콘", src: "/images/logo_work/넥스트유니콘.png" },
    { name: "트렌스링크인베스트먼트", src: "/images/logo_work/트렌스링크인베스트먼트.png" },
    { name: "아리시스", src: "/images/logo_work/아리시스.png" },
    { name: "워터스코리아", src: "/images/logo_work/워터스코리아.png" },
    { name: "SKM&S", src: "/images/logo_work/skmnslogo.png" },
    
    // 서비스 및 유통업
    { name: "아가방앤컴퍼니", src: "/images/logo_work/아가방앤컴퍼니.png" },
    { name: "아가방", src: "/images/logo_work/아가방.png" },
    { name: "맥도날드", src: "/images/logo_work/mcdonalds.png" },
    { name: "말본골프", src: "/images/logo_work/말본골프.png" },
    { name: "스위트벙커디자인", src: "/images/logo_work/스위트벙커디자인.png" },
    { name: "패션비즈", src: "/images/logo_work/패션비즈.png" },
    { name: "파익스", src: "/images/logo_work/파익스.png" },
    { name: "코닥어패럴", src: "/images/logo_work/코닥어패럴.png" },
    { name: "LF", src: "/images/logo_work/LF.png" },
    { name: "대상그룹", src: "/images/logo_work/대상그룹.png" },
    { name: "대상웰라이프", src: "/images/logo_work/대상웰라이프.png" },
    { name: "대상정보기술", src: "/images/logo_work/대상정보기술.png" },
    { name: "한국패션산업연구원", src: "/images/logo_work/한국패션산업연구원.png" },
    
    // 대학교 및 교육기관
    { name: "카톨릭대학교", src: "/images/logo_work/카톨릭대학교.png" },
    { name: "연세대학교", src: "/images/logo_work/연세대학교.png" },
    { name: "고려대학교", src: "/images/logo_work/고려대학교.png" },
    { name: "서울대학교", src: "/images/logo_work/서울대학교.png" },
    { name: "서울시립대학교", src: "/images/logo_work/서울시립대학교.png" },
    { name: "숭실대학교", src: "/images/logo_work/숭실대학교.png" },
    { name: "한국기술교육대", src: "/images/logo_work/한국기술교육대.png" },
    { name: "아주대학교", src: "/images/logo_work/아주대학교.png" },
    { name: "세종사이버대학교", src: "/images/logo_work/세종사이버대학교.png" },
    { name: "인천대학교", src: "/images/logo_work/인천대학교.png" },
    { name: "한국종합예술학교", src: "/images/logo_work/한국종합예술학교.png" },
    { name: "한국예술종합학교", src: "/images/logo_work/한국예술종합학교.png" },
    { name: "수원여대", src: "/images/logo_work/수원여대.png" },
    { name: "청주대", src: "/images/logo_work/청주대.png" },
    { name: "호서대", src: "/images/logo_work/호서대.png" },
    { name: "협성대", src: "/images/logo_work/협성대.png" },
    { name: "성결대", src: "/images/logo_work/성결대.png" },
    { name: "부경대", src: "/images/logo_work/부경대.png" },
    { name: "부산대", src: "/images/logo_work/부산대.png" },
    { name: "동덕여대", src: "/images/logo_work/동덕여대.png" },
    { name: "성신여대", src: "/images/logo_work/성신여대.png" },
    { name: "충북대학교", src: "/images/logo_work/충북대학교.png" },
    { name: "인하공업전문대학교", src: "/images/logo_work/인하공업전문대학교.png" },
    { name: "동원대학교", src: "/images/logo_work/동원대학교.png" },
    { name: "광주과학기술원", src: "/images/logo_work/광주과학기술원.png" },
    { name: "꿈의학교", src: "/images/logo_work/꿈의학교.png" },
    
    // 중앙정부 및 공공기관
    { name: "경찰청", src: "/images/logo_work/경찰청.png" },
    { name: "관세청", src: "/images/logo_work/관세청.png" },
    { name: "행정안전부", src: "/images/logo_work/행정안전부.png" },
    { name: "코이카", src: "/images/logo_work/코이카.png" },
    { name: "우정사업본부", src: "/images/logo_work/우정사업본부.png" },
    { name: "한국전기안전공사", src: "/images/logo_work/한국전기안전공사.png" },
    { name: "한국남부발전", src: "/images/logo_work/한국남부발전.png" },
    { name: "한국중부발전", src: "/images/logo_work/한국중부발전.png" },
    { name: "수도권매립지관리공사", src: "/images/logo_work/수도권매립지관리공사.png" },
    { name: "해양환경공단", src: "/images/logo_work/해양환경공단.png" },
    { name: "대한지방행정공제회", src: "/images/logo_work/대한지방행정공제회.png" },
    { name: "한국토지신탁", src: "/images/logo_work/한국토지신탁.png" },
    
    // 지방자치단체
    { name: "경상북도청", src: "/images/logo_work/경상북도청.png" },
    { name: "경기도청", src: "/images/logo_work/경기도청.png" },
    { name: "마포구", src: "/images/logo_work/마포구.png" },
    { name: "강동구청", src: "/images/logo_work/강동구청.png" },
    { name: "광진구청", src: "/images/logo_work/광진구청.png" },
    { name: "포천시", src: "/images/logo_work/포천시.png" },
    { name: "포천시청", src: "/images/logo_work/포천시청.png" },
    
    // 공공기관 및 진흥원
    { name: "한국양성평등원", src: "/images/logo_work/한국양성평등원.png" },
    { name: "한국생산성본부", src: "/images/logo_work/한국생산성본부.png" },
    { name: "한국표준협회", src: "/images/logo_work/한국표준협회.png" },
    { name: "한국청소년활동진흥원", src: "/images/logo_work/한국청소년활동진흥원.png" },
    { name: "한국데이터산업진흥원", src: "/images/logo_work/한국데이터산업진흥원.png" },
    { name: "한국메세나협회", src: "/images/logo_work/한국메세나협회.png" },
    { name: "경상북도사회적경제지원센터", src: "/images/logo_work/경상북도사회적경제지원센터.png" },
    { name: "울산경제진흥원", src: "/images/logo_work/울산경제진흥원.png" },
    { name: "인천테크노파크", src: "/images/logo_work/인천테크노파크.png" },
    { name: "부산경제진흥원", src: "/images/logo_work/부산경제진흥원.png" },
    { name: "성남산업진흥원", src: "/images/logo_work/성남산업진흥원.png" },
    { name: "경기도일자리재단", src: "/images/logo_work/경기도일자리재단.png" },
    { name: "대구디지털혁신진흥원", src: "/images/logo_work/대구디지털혁신진흥원.png" },
    { name: "부산관광마이스진흥회", src: "/images/logo_work/부산관광마이스진흥회.png" },
    { name: "화성시복지재단", src: "/images/logo_work/화성시복지재단.png" },
    
    // 문화 및 예술기관
    { name: "국립극장", src: "/images/logo_work/국립극장.png" },
    { name: "서울문화재단", src: "/images/logo_work/서울문화재단.png" },
    { name: "LG아트센터", src: "/images/logo_work/LG아트센터.png" },
    { name: "엘지아트센터", src: "/images/logo_work/엘지아트센터.png" },
    { name: "엘지재단", src: "/images/logo_work/엘지재단.png" },
    
    // 취업 지원 및 인력개발
    { name: "서울시일자리까페", src: "/images/logo_work/서울시일자리까페.png" },
    { name: "종로여성인력개발원", src: "/images/logo_work/종로여성인력개발원.png" },
    { name: "제주더큰내일센터", src: "/images/logo_work/제주더큰내일센터.png" },
    { name: "제주청년센터", src: "/images/logo_work/제주청년센터-removebg-preview.png" },
    { name: "마포청년나루", src: "/images/logo_work/마포청년나루.png" },
    { name: "하이서울기업협회", src: "/images/logo_work/하이서울기업협회.png" },
    { name: "인천유유기지", src: "/images/logo_work/인천유유기지.png" },
    
    // 기타 기업 및 기관
    { name: "꿈비로고", src: "/images/logo_work/꿈비로고.png" },
    { name: "종합건축사사무소 담", src: "/images/logo_work/종합건축사사무소 담.png" },
  ];

  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 - 다른 페이지와 동일한 스타일 */}
      <section className="relative w-full h-[25vh] sm:h-[30vh] md:h-[40vh] flex items-center bg-gradient-to-r from-[#0061ad] to-[#004d8a]">
        <div className="container mx-auto px-4 z-10 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4 break-keep">
            Our Works
          </h1>
          <p className="text-base sm:text-lg md:text-2xl max-w-3xl break-keep">
            다양한 분야의 리딩 기업들과 함께한 성공 스토리
          </p>
        </div>
      </section>

      {/* 소개 섹션 */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 break-keep">
            믿고 함께해온 파트너들
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-4xl mx-auto leading-relaxed break-keep">
            우리는 대기업부터 공공기관, 교육기관까지 다양한 분야의 선도 기업들과 파트너십을 구축해왔습니다.
            각 조직의 고유한 문화와 목표에 맞춘 맞춤형 코칭 솔루션을 제공하여,
            지속 가능한 성장과 발전을 함께 이루어가고 있습니다.
          </p>
        </div>
      </section>

      {/* 로고 마퀴 섹션 */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 sm:mb-12 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 break-keep">
              함께한 주요 기업들
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {/* 첫 번째 줄 - 좌에서 우로 (대기업) */}
            <div className="w-full overflow-hidden">
              <div className="flex animate-marquee hover:[animation-play-state:paused]">
                {clientLogos.slice(0, 20).map((logo, index) => (
                  <div
                    key={`row1-first-${index}`}
                    className="flex items-center justify-center mx-6 sm:mx-8 md:mx-12 flex-shrink-0"
                  >
                    <div className={`w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 flex items-center justify-center bg-white rounded-lg ${logo.name === "롯데상사" || logo.name === "DB하이텍" ? "p-0" : "p-3"}`}>
                      <Image
                        src={logo.src}
                        alt={`${logo.name} 로고`}
                        width={160}
                        height={80}
                        className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
                {/* 연속성을 위한 복제 */}
                {clientLogos.slice(0, 20).map((logo, index) => (
                  <div
                    key={`row1-second-${index}`}
                    className="flex items-center justify-center mx-6 sm:mx-8 md:mx-12 flex-shrink-0"
                  >
                    <div className={`w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 flex items-center justify-center bg-white rounded-lg ${logo.name === "롯데상사" || logo.name === "DB하이텍" ? "p-0" : "p-3"}`}>
                      <Image
                        src={logo.src}
                        alt={`${logo.name} 로고`}
                        width={160}
                        height={80}
                        className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 두 번째 줄 - 우에서 좌로 (교육기관) */}
            <div className="w-full overflow-hidden">
              <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
                {clientLogos.slice(20, 40).map((logo, index) => (
                  <div
                    key={`row2-first-${index}`}
                    className="flex items-center justify-center mx-6 sm:mx-8 md:mx-12 flex-shrink-0"
                  >
                    <div className={`w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 flex items-center justify-center bg-white rounded-lg ${logo.name === "롯데상사" || logo.name === "DB하이텍" ? "p-0" : "p-3"}`}>
                      <Image
                        src={logo.src}
                        alt={`${logo.name} 로고`}
                        width={160}
                        height={80}
                        className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
                {/* 연속성을 위한 복제 */}
                {clientLogos.slice(20, 40).map((logo, index) => (
                  <div
                    key={`row2-second-${index}`}
                    className="flex items-center justify-center mx-6 sm:mx-8 md:mx-12 flex-shrink-0"
                  >
                    <div className={`w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 flex items-center justify-center bg-white rounded-lg ${logo.name === "롯데상사" || logo.name === "DB하이텍" ? "p-0" : "p-3"}`}>
                      <Image
                        src={logo.src}
                        alt={`${logo.name} 로고`}
                        width={160}
                        height={80}
                        className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 세 번째 줄 - 좌에서 우로 (공공기관) */}
            <div className="w-full overflow-hidden">
              <div className="flex animate-marquee-slow hover:[animation-play-state:paused]">
                {clientLogos.slice(40, 60).map((logo, index) => (
                  <div
                    key={`row3-first-${index}`}
                    className="flex items-center justify-center mx-6 sm:mx-8 md:mx-12 flex-shrink-0"
                  >
                    <div className={`w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 flex items-center justify-center bg-white rounded-lg ${logo.name === "롯데상사" || logo.name === "DB하이텍" ? "p-0" : "p-3"}`}>
                      <Image
                        src={logo.src}
                        alt={`${logo.name} 로고`}
                        width={160}
                        height={80}
                        className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
                {/* 연속성을 위한 복제 */}
                {clientLogos.slice(40, 60).map((logo, index) => (
                  <div
                    key={`row3-second-${index}`}
                    className="flex items-center justify-center mx-6 sm:mx-8 md:mx-12 flex-shrink-0"
                  >
                    <div className={`w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 flex items-center justify-center bg-white rounded-lg ${logo.name === "롯데상사" || logo.name === "DB하이텍" ? "p-0" : "p-3"}`}>
                      <Image
                        src={logo.src}
                        alt={`${logo.name} 로고`}
                        width={160}
                        height={80}
                        className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 네 번째 줄 - 우에서 좌로 (지방자치단체) */}
            <div className="w-full overflow-hidden">
              <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
                {clientLogos.slice(60, 80).map((logo, index) => (
                  <div
                    key={`row4-first-${index}`}
                    className="flex items-center justify-center mx-6 sm:mx-8 md:mx-12 flex-shrink-0"
                  >
                    <div className={`w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 flex items-center justify-center bg-white rounded-lg ${logo.name === "롯데상사" || logo.name === "DB하이텍" ? "p-0" : "p-3"}`}>
                      <Image
                        src={logo.src}
                        alt={`${logo.name} 로고`}
                        width={160}
                        height={80}
                        className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
                {/* 연속성을 위한 복제 */}
                {clientLogos.slice(60, 80).map((logo, index) => (
                  <div
                    key={`row4-second-${index}`}
                    className="flex items-center justify-center mx-6 sm:mx-8 md:mx-12 flex-shrink-0"
                  >
                    <div className={`w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 flex items-center justify-center bg-white rounded-lg ${logo.name === "롯데상사" || logo.name === "DB하이텍" ? "p-0" : "p-3"}`}>
                      <Image
                        src={logo.src}
                        alt={`${logo.name} 로고`}
                        width={160}
                        height={80}
                        className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 다섯 번째 줄 - 좌에서 우로 (진흥원 및 공공기관) */}
            <div className="w-full overflow-hidden">
              <div className="flex animate-marquee hover:[animation-play-state:paused]">
                {clientLogos.slice(80, 100).map((logo, index) => (
                  <div
                    key={`row5-first-${index}`}
                    className="flex items-center justify-center mx-6 sm:mx-8 md:mx-12 flex-shrink-0"
                  >
                    <div className={`w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 flex items-center justify-center bg-white rounded-lg ${logo.name === "롯데상사" || logo.name === "DB하이텍" ? "p-0" : "p-3"}`}>
                      <Image
                        src={logo.src}
                        alt={`${logo.name} 로고`}
                        width={160}
                        height={80}
                        className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
                {/* 연속성을 위한 복제 */}
                {clientLogos.slice(80, 100).map((logo, index) => (
                  <div
                    key={`row5-second-${index}`}
                    className="flex items-center justify-center mx-6 sm:mx-8 md:mx-12 flex-shrink-0"
                  >
                    <div className={`w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 flex items-center justify-center bg-white rounded-lg ${logo.name === "롯데상사" || logo.name === "DB하이텍" ? "p-0" : "p-3"}`}>
                      <Image
                        src={logo.src}
                        alt={`${logo.name} 로고`}
                        width={160}
                        height={80}
                        className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 여섯 번째 줄 - 우에서 좌로 (문화기관 및 기타) */}
            <div className="w-full overflow-hidden">
              <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
                {clientLogos.slice(100).map((logo, index) => (
                  <div
                    key={`row6-first-${index}`}
                    className="flex items-center justify-center mx-6 sm:mx-8 md:mx-12 flex-shrink-0"
                  >
                    <div className={`w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 flex items-center justify-center bg-white rounded-lg ${logo.name === "롯데상사" || logo.name === "DB하이텍" ? "p-0" : "p-3"}`}>
                      <Image
                        src={logo.src}
                        alt={`${logo.name} 로고`}
                        width={160}
                        height={80}
                        className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
                {/* 연속성을 위한 복제 */}
                {clientLogos.slice(100).map((logo, index) => (
                  <div
                    key={`row6-second-${index}`}
                    className="flex items-center justify-center mx-6 sm:mx-8 md:mx-12 flex-shrink-0"
                  >
                    <div className={`w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 flex items-center justify-center bg-white rounded-lg ${logo.name === "롯데상사" || logo.name === "DB하이텍" ? "p-0" : "p-3"}`}>
                      <Image
                        src={logo.src}
                        alt={`${logo.name} 로고`}
                        width={160}
                        height={80}
                        className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 