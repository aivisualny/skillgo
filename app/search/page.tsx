'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { tools as allTools } from '@/data/tools';
import { Tool } from '@/types';
import Link from 'next/link';
import { StarIcon, ComputerDesktopIcon, DevicePhoneMobileIcon, GlobeAltIcon } from '@heroicons/react/24/solid';

const getUnique = (arr: string[]) => Array.from(new Set(arr));

const platformIcons: Record<string, {icon: string, label: string}> = {
  Windows: { icon: '🪟', label: 'Windows' },
  macOS: { icon: '🍎', label: 'macOS' },
  Linux: { icon: '🐧', label: 'Linux' },
  iOS: { icon: '📱', label: 'iOS' },
  Android: { icon: '🤖', label: 'Android' },
  Web: { icon: '🌐', label: 'Web' },
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const [results, setResults] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('전체');
  const [platform, setPlatform] = useState('전체');
  const [pricing, setPricing] = useState('전체');
  const [sort, setSort] = useState<'popularity' | 'name'>('popularity');

  // 필터 옵션 추출
  const categories = getUnique(['전체', ...allTools.map(t => t.category)]);
  const platforms = getUnique(['전체', ...allTools.flatMap(t => t.platforms.map(p => p.name))]);
  const pricings = getUnique(['전체', ...allTools.map(t => t.pricing.type)]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = allTools.filter(tool =>
        (tool.name.toLowerCase().includes(query.toLowerCase()) ||
         tool.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) &&
        (category === '전체' || tool.category === category) &&
        (platform === '전체' || tool.platforms.some(p => p.name === platform)) &&
        (pricing === '전체' || tool.pricing.type === pricing)
      );
      if (sort === 'popularity') {
        filtered = filtered.sort((a, b) => b.popularity - a.popularity);
      } else {
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
      }
      setResults(filtered);
      setLoading(false);
    }, 300);
  }, [query, category, platform, pricing, sort]);

  return (
    <div className="min-h-screen bg-blue-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          "{query}" 검색 결과
        </h1>
        {/* 필터/정렬 바 */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center bg-white rounded-xl shadow-sm p-4 border border-blue-100">
          <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 rounded-lg border border-blue-100 bg-blue-50 text-blue-900">
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={platform} onChange={e => setPlatform(e.target.value)} className="px-3 py-2 rounded-lg border border-blue-100 bg-blue-50 text-blue-900">
            {platforms.map(p => <option key={p}>{p}</option>)}
          </select>
          <select value={pricing} onChange={e => setPricing(e.target.value)} className="px-3 py-2 rounded-lg border border-blue-100 bg-blue-50 text-blue-900">
            {pricings.map(p => <option key={p}>{p}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value as 'popularity' | 'name')} className="px-3 py-2 rounded-lg border border-blue-100 bg-blue-50 text-blue-900">
            <option value="popularity">인기순</option>
            <option value="name">이름순</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {loading ? (
            <div className="col-span-2 flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : results.length === 0 ? (
            <div className="col-span-2 text-center text-gray-400 mt-16">검색 결과가 없습니다.</div>
          ) : results.map((tool) => (
            <Link 
              href={`/tool/${tool.id}`} 
              key={tool.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-blue-100 flex flex-col h-full group hover:scale-[1.02] transition-transform"
            >
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  {/* 배지들 */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="flex items-center text-blue-500 text-sm">
                      <StarIcon className="h-4 w-4 mr-1" />
                      {tool.popularity}%
                    </span>
                    {tool.pricing.type === 'Free' && (
                      <span className="px-2 py-1 text-xs rounded-full font-medium bg-green-100 text-green-700">
                        💰 무료
                      </span>
                    )}
                    {tool.pricing.type === 'Paid' && (
                      <span className="px-2 py-1 text-xs rounded-full font-medium bg-blue-50 text-blue-500 border border-blue-200">
                        💳 유료
                      </span>
                    )}
                    {tool.pricing.type === 'Freemium' && (
                      <span className="px-2 py-1 text-xs rounded-full font-medium bg-yellow-100 text-yellow-700">
                        🆓 무료+유료
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-blue-900 truncate">{tool.name}</h2>
                  </div>
                  
                  {/* 툴 요약문 */}
                  <div className="text-sm text-blue-600 mb-3 font-medium">
                    {tool.category === 'AI 비디오 생성' ? '📽 유튜브용 영상 쉽게 만들기' :
                     tool.category === 'AI 이미지 생성' ? '🎨 그림을 입력하면 AI가 동영상으로 변환해줘요' :
                     tool.category === 'AI 음성 생성' ? '🗣️ 텍스트를 자연스러운 목소리로 변환' :
                     tool.category === 'AI 채팅' ? '💬 질문하면 AI가 답변해줘요' :
                     tool.category === 'AI 텍스트 생성' ? '✍️ 블로그, 이메일 자동 작성 도우미' :
                     tool.category === 'AI 코딩 도우미' ? '🧠 코드 자동완성과 오류 수정' :
                     tool.category === 'AI 번역' ? '🔤 텍스트 번역과 요약' :
                     '✨ AI로 쉽고 빠르게 작업하기'}
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{tool.description}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {tool.platforms.map((platform) => (
                      <span key={platform.name} className="text-blue-400 flex items-center gap-1">
                        {platform.name === 'Windows' || platform.name === 'macOS' || platform.name === 'Linux' ? (
                          <>
                            <ComputerDesktopIcon className="h-4 w-4" />
                            <span className="text-xs text-blue-600">{platformIcons[platform.name]?.label}</span>
                          </>
                        ) : platform.name === 'iOS' || platform.name === 'Android' ? (
                          <>
                            <DevicePhoneMobileIcon className="h-4 w-4" />
                            <span className="text-xs text-blue-600">{platformIcons[platform.name]?.label}</span>
                          </>
                        ) : (
                          <>
                            <GlobeAltIcon className="h-4 w-4" />
                            <span className="text-xs text-blue-600">{platformIcons[platform.name]?.label}</span>
                          </>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* 이미지 영역 */}
              <div className="h-32 w-full bg-blue-100 flex items-center justify-center overflow-hidden border-t border-blue-50">
                {tool.imageUrl ? (
                  <img
                    src={tool.imageUrl}
                    alt={tool.name}
                    className="object-contain h-20"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <span className="text-2xl mb-1">🔍</span>
                    <span className="text-xs">이미지 준비 중</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 