'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon, ChevronUpIcon, PlayCircleIcon, ArrowTopRightOnSquareIcon, VideoCameraIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { tools, ExtendedTool } from '@/data/tools';

const aiCategories = [
  {
    key: 'video',
    name: '🎬 비디오 생성',
    desc: 'AI로 영상 만들기',
    toolCategories: ['AI 비디오 생성'],
  },
  {
    key: 'image',
    name: '🖼️ 이미지 생성',
    desc: 'AI 그림/사진 생성',
    toolCategories: ['AI 이미지 생성'],
  },
  {
    key: 'voice',
    name: '🗣️ 음성 생성 / TTS',
    desc: 'AI 목소리 만들기',
    toolCategories: ['AI 음성 생성'],
  },
  {
    key: 'chat',
    name: '💬 AI 챗봇',
    desc: '질문을 하면 대답해주는 AI 비서, 정보 정리 및 생산 가능',
    toolCategories: ['AI 채팅'],
  },
  {
    key: 'text',
    name: '✍️ 텍스트 생성 / 글쓰기 보조',
    desc: '블로그, 기사, 이메일 등 텍스트 자동 작성 도우미',
    toolCategories: ['AI 텍스트 생성'],
  },
  {
    key: 'code',
    name: '🧠 AI 코딩 도우미',
    desc: '코드 자동완성, 오류 잡기, 코딩 튜터 역할',
    toolCategories: ['AI 코딩 도우미'],
  },
  {
    key: 'translate',
    name: '🔤 AI 번역 / 요약',
    desc: '텍스트를 번역하거나 한눈에 보이게 요약',
    toolCategories: ['AI 번역', 'AI 요약'],
  },
];

const platformIcons: Record<string, {icon: string, label: string}> = {
  Windows: { icon: '🪟', label: 'Windows' },
  macOS: { icon: '🍎', label: 'macOS' },
  Linux: { icon: '🐧', label: 'Linux' },
  iOS: { icon: '📱', label: 'iOS' },
  Android: { icon: '🤖', label: 'Android' },
  Web: { icon: '🌐', label: 'Web' },
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const currentCat = aiCategories.find(c => c.key === selectedCat);
  const currentTools = currentCat
    ? tools.filter(t => currentCat.toolCategories && currentCat.toolCategories.includes(t.category))
    : [];

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-0 font-sans" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>
      <div className="w-full max-w-none px-0 flex flex-col items-center">
        <div className="w-full max-w-none mx-auto py-16">
          <div className="text-center mb-16">
            <h1 className="text-7xl font-extrabold text-[#1a2340] mb-6 tracking-tight drop-shadow-sm leading-tight">SkillGo</h1>
            <p className="text-3xl text-[#222] mb-4 font-bold">어떤 AI 기능을 써보고 싶으신가요?</p>
            <p className="text-gray-400 text-xl">초보자도 한눈에! 원하는 기능을 클릭해 관련 툴을 확인해보세요.</p>
          </div>
          <form onSubmit={handleSearch} className="flex shadow-lg rounded-full overflow-hidden border border-[#e0e7ef] bg-white mb-16 max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-10 py-7 text-2xl outline-none bg-white text-[#1a2340] placeholder-[#b6c2d6] font-sans rounded-full"
              placeholder="예: 유튜브 영상 만들기, 목소리 변환, 번역, 코드 생성"
            />
            <button
              type="submit"
              className="flex items-center px-12 py-7 bg-[#2952e3] hover:bg-[#1a2340] text-white font-bold text-2xl transition-colors font-sans rounded-full"
            >
              <MagnifyingGlassIcon className="h-8 w-8 mr-2" />
              검색
            </button>
          </form>
          {/* 기능 카테고리 버튼 */}
          <div className="flex flex-wrap gap-4 justify-center mb-14">
            {aiCategories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCat(cat.key)}
                className={`group relative px-8 py-4 rounded-full font-bold text-2xl border shadow-sm transition-all duration-150 font-sans tracking-tight ${selectedCat === cat.key ? 'bg-[#2952e3] text-white border-[#2952e3] scale-105 shadow-lg' : 'bg-[#f5f7fa] text-[#1a2340] border-[#e0e7ef] hover:bg-[#e9f0fb]'}`}
                title={cat.desc}
              >
                <div className="flex flex-col items-center">
                  <span>{cat.name}</span>
                  <span className={`text-sm font-normal mt-1 ${selectedCat === cat.key ? 'text-blue-100' : 'text-gray-500'}`}>
                    {cat.desc}
                  </span>
                </div>
                {/* 툴팁 */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {cat.desc}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </button>
            ))}
          </div>
          {/* 카테고리 설명 */}
          {currentCat && (
            <div className="text-center mb-12 animate-fade-in">
              <div className="text-4xl font-extrabold text-[#1a2340] mb-3 flex items-center justify-center gap-2 font-sans tracking-tight">
                <span>{currentCat.name}</span>
              </div>
              <div className="text-[#2952e3] text-2xl font-medium font-sans">{currentCat.desc}</div>
            </div>
          )}
          {/* 툴 카드 리스트 */}
          {currentCat && (
            <div className="flex flex-col gap-10 w-full items-center animate-slide-up">
              {currentTools.length === 0 && (
                <div className="text-center text-gray-400">아직 등록된 툴이 없습니다.</div>
              )}
              {currentTools.map((tool: ExtendedTool) => {
                return (
                  <div
                    key={tool.id}
                    className={"flex flex-row bg-white rounded-3xl border border-[#e0e7ef] p-8 gap-8 group transition-all duration-200 shadow-lg hover:shadow-2xl hover:scale-[1.01] hover:border-[#2952e3] cursor-pointer"}
                    style={{ minHeight: 300, maxWidth: '90vw', width: '100%', fontFamily: 'Noto Sans KR, Inter, sans-serif' }}
                    onClick={() => router.push(`/tool/${tool.id}`)}
                  >
                    {/* 왼쪽: 로고, 이름, 추천 한 줄, 난이도 뱃지 */}
                    <div className="flex flex-col justify-between min-w-[180px] max-w-[220px] flex-shrink-0 h-full">
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          {tool.logo ? (
                            <img src={tool.logo} alt={tool.name + ' 로고'} className="w-14 h-14 rounded-full bg-[#f5f7fa] border border-[#e0e7ef] object-contain shadow-sm" />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-[#f5f7fa] border border-[#e0e7ef] flex items-center justify-center shadow-sm">
                              <span className="text-2xl">🔍</span>
                            </div>
                          )}
                          <span className="font-extrabold text-[#1a2340] text-2xl tracking-tight drop-shadow-sm" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>{tool.name}</span>
                        </div>
                        {/* 툴 요약문 */}
                        <div className="text-base text-[#2952e3] mt-3 font-semibold" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>
                          {tool.category === 'AI 비디오 생성' ? '📽 유튜브용 영상 쉽게 만들기' :
                           tool.category === 'AI 이미지 생성' ? '🎨 그림을 입력하면 AI가 동영상으로 변환해줘요' :
                           tool.category === 'AI 음성 생성' ? '🗣️ 텍스트를 자연스러운 목소리로 변환' :
                           tool.category === 'AI 채팅' ? '💬 질문하면 AI가 답변해줘요' :
                           tool.category === 'AI 텍스트 생성' ? '✍️ 블로그, 이메일 자동 작성 도우미' :
                           tool.category === 'AI 코딩 도우미' ? '🧠 코드 자동완성과 오류 수정' :
                           tool.category === 'AI 번역' ? '🔤 텍스트 번역과 요약' :
                           '✨ AI로 쉽고 빠르게 작업하기'}
                        </div>
                      </div>
                      {/* 배지들 */}
                      <div className="flex flex-col gap-2 mt-4">
                        {tool.difficulty && (
                          <div className={`px-4 py-1 rounded-full text-base font-bold shadow-sm w-fit text-center ${tool.difficulty === '입문자 추천' ? 'bg-[#e6fbe6] text-[#1a4d2e]' : tool.difficulty === '프롬프트 필요' ? 'bg-[#fff7e6] text-[#7a5a00]' : 'bg-[#ffe6e6] text-[#7a1a1a]'}`}
                            style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>
                            {tool.difficulty}
                          </div>
                        )}
                        {tool.koreanSupport && (
                          <div className="px-4 py-1 rounded-full text-base font-bold shadow-sm w-fit text-center bg-[#e9f0fb] text-[#2952e3]" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>
                            🇰🇷 한글 지원
                          </div>
                        )}
                        {tool.pricing.type === 'Free' && (
                          <div className="px-4 py-1 rounded-full text-base font-bold shadow-sm w-fit text-center bg-[#e6fbe6] text-[#1a4d2e]" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>
                            💰 무료 사용 가능
                          </div>
                        )}
                      </div>
                    </div>
                    {/* 오른쪽: 상세 정보(추천/기능/지원환경/예시 영상) */}
                    <div className="flex-1 flex flex-row gap-8 overflow-hidden box-border flex-nowrap md:flex-row flex-col min-w-0 max-w-full bg-[#f5f7fa] rounded-2xl p-8">
                      {/* 왼쪽: 추천/기능/지원환경 */}
                      <div className="flex-1 flex flex-col gap-4 min-w-[200px] max-w-[600px]">
                        <div className="mb-2 font-bold text-[#2952e3] flex items-center gap-2" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>이런 분께 추천:</div>
                        <div className="whitespace-pre-line mb-3 text-[#3b4a6b]" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>{tool.recommend.replace(/^[✅💡\-\*\s]+/, '')}</div>
                        <div className="mb-1 font-bold text-[#2952e3] flex items-center gap-2" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>기능/지원 환경:</div>
                        <div className="flex flex-row flex-wrap items-center gap-2 min-w-0 overflow-x-auto">
                          {tool.features?.map((f, i) => (
                            <span key={i} className="inline-flex min-w-fit whitespace-nowrap bg-[#e9f0fb] rounded px-4 py-2 text-base font-medium" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>{f}</span>
                          ))}
                          {tool.fileTypes && <span className="inline-flex min-w-fit whitespace-nowrap bg-[#e9f0fb] rounded px-4 py-2 text-base font-medium" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>🗂 {tool.fileTypes.join(', ')}</span>}
                          <span className="inline-flex min-w-fit whitespace-nowrap bg-[#e9f0fb] rounded px-4 py-2 text-base font-medium" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>{tool.koreanSupport ? '한국어 지원' : 'Only English'}</span>
                          {tool.platforms.map((p, idx) => (
                            <span key={p.name} className="inline-flex min-w-fit whitespace-nowrap items-center gap-1 bg-[#e9f0fb] rounded px-4 py-2 text-base font-medium" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>
                              {platformIcons[p.name]?.icon}
                              <span className="font-medium text-[#3b4a6b]">{platformIcons[p.name]?.label}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* 오른쪽: 예시 영상 */}
                      {tool.exampleVideoUrl && (
                        <div className="flex-1 flex flex-col items-start justify-center min-w-[350px] max-w-[600px] w-full overflow-hidden box-border">
                          <div className="font-bold text-[#2952e3] mb-2 flex items-center gap-2" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}><PlayCircleIcon className="w-6 h-6" /> 예시 영상</div>
                          <iframe
                            src={tool.exampleVideoUrl}
                            title="예시 영상"
                            className="w-full max-w-full aspect-[16/9] rounded-lg border object-cover"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}
                    </div>
                    {/* 오른쪽: 버튼들 */}
                    <div className="flex flex-col justify-between items-end min-w-[180px] max-w-[220px] flex-shrink-0 w-full">
                      <div className="flex flex-col gap-2 w-full items-end">
                        <button
                          onClick={() => router.push(`/tool/${tool.id}`)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f5f7fa] hover:bg-[#2952e3] text-[#1a2340] hover:text-white text-base font-bold border border-[#e0e7ef] shadow-sm transition-all"
                          style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}
                        >
                          <BookOpenIcon className="w-5 h-5" /> 요약/상세
                        </button>
                        {tool.tutorialUrl && (
                          <a
                            href={tool.tutorialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f5f7fa] hover:bg-[#2952e3] text-[#1a2340] hover:text-white text-base font-bold border border-[#e0e7ef] shadow-sm transition-all"
                            style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}
                          >
                            <ArrowTopRightOnSquareIcon className="w-5 h-5" /> 튜토리얼
                          </a>
                        )}
                        {tool.exampleVideoUrl && (
                          <a
                            href={tool.exampleVideoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f5f7fa] hover:bg-[#2952e3] text-[#1a2340] hover:text-white text-base font-bold border border-[#e0e7ef] shadow-sm transition-all"
                            style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}
                          >
                            <PlayCircleIcon className="w-5 h-5" /> 예시 영상
                          </a>
                        )}
                        {tool.platforms[0]?.url && (
                          <a
                            href={tool.platforms[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2952e3] hover:bg-[#1a2340] text-white text-base font-bold border border-[#2952e3] shadow-sm transition-all"
                            style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}
                          >
                            <ArrowTopRightOnSquareIcon className="w-5 h-5" /> 실행하기
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </main>
  );
} 