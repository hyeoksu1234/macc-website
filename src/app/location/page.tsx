'use client';

import React from 'react';

const LocationPage = () => {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 - 모바일 최적화 */}
      <section className="relative w-full h-[25vh] sm:h-[30vh] md:h-[40vh] flex items-center bg-gradient-to-r from-[#0061ad] to-[#004d8a]">
        <div className="container mx-auto px-4 z-10 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4 break-keep">
            오시는 길
          </h1>
          <p className="text-base sm:text-lg md:text-2xl max-w-3xl break-keep">
            마스터피스 얼라이언스에 방문하시는 방법을 안내해 드립니다.
          </p>
        </div>
      </section>

      {/* 정보 섹션 - 모바일 최적화 */}
      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* 주소 및 연락처 */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 break-keep">주소 및 연락처</h2>
              <div className="space-y-4 sm:space-y-6 text-gray-700">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 text-[#0061ad] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl text-[#0061ad] mb-1 sm:mb-2">주소</h3>
                    <p className="text-sm sm:text-base md:text-lg break-keep leading-relaxed">서울특별시 강남구 테헤란로 311, 1022호(역삼동, 아남타워)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 text-[#0061ad] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl text-[#0061ad] mb-1 sm:mb-2">전화번호</h3>
                    <p className="text-sm sm:text-base md:text-lg">+82 10 3406 5414</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 text-[#0061ad] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl text-[#0061ad] mb-1 sm:mb-2">이메일</h3>
                    <p className="text-sm sm:text-base md:text-lg break-all">leeyoon@ma-cc.co.kr</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 text-[#0061ad] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl text-[#0061ad] mb-1 sm:mb-2">업무시간</h3>
                    <p className="text-sm sm:text-base md:text-lg">평일 09:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 교통편 안내 */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 break-keep">교통편 안내</h2>
              
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#0061ad] mb-2 sm:mb-3 md:mb-4 flex items-center break-keep">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    지하철 이용 시
                  </h3>
                  <p className="ml-7 sm:ml-9 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed break-keep">
                    2호선, 수인분당선 선릉역 5번 출구에서 도보 5분<br />
                    {/* 2호선 역삼역 5번 출구에서 도보 10분 */}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#0061ad] mb-2 sm:mb-3 md:mb-4 flex items-center break-keep">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    버스 이용 시
                  </h3>
                  <p className="ml-7 sm:ml-9 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed break-keep">
                    광역버스: 1100, 1700, 2000, 7007, 8001<br />
                    간선버스: 146, 341, 360, 740
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#0061ad] mb-2 sm:mb-3 md:mb-4 flex items-center break-keep">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    주차 안내
                  </h3>
                  <p className="ml-7 sm:ml-9 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed break-keep">
                    아남타워 지하 주차장 이용 가능 (유료)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 지도 섹션 - 모바일 최적화 */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 sm:mb-12 md:mb-16">
            {/* 모바일에서 더 큰 지도 표시 */}
            <div className="w-full relative bg-gray-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
              <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative">
                <a
                  href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%ED%85%8C%ED%97%A4%EB%9E%80%EB%A1%9C%20311%20%EC%95%84%EB%82%A8%ED%83%80%EC%9B%8C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full relative group cursor-pointer"
                  title="네이버 지도에서 위치 확인하기"
                >
                  <img
                    src="/images/location-map.png"
                    alt="마스터피스 얼라이언스 오시는 길"
                    className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* 호버 오버레이 */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-lg">
                      <div className="flex items-center text-[#0061ad] font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm sm:text-base">지도에서 보기</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 - 모바일 최적화 */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#0061ad] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 break-keep">
            방문 전 미리 연락주세요
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto break-keep">
            효율적인 상담을 위해 방문 전에 미리 연락주시면 감사하겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="tel:+821034065414"
              className="inline-flex items-center justify-center bg-white text-[#0061ad] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.948.684l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.042 11.042 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              전화하기
            </a>
            <a
              href="mailto:leeyoon@ma-cc.co.kr"
              className="inline-flex items-center justify-center border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-[#0061ad] transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              이메일 보내기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage; 