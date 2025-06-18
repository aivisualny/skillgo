'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { tools as allTools } from '@/data/tools';
import { Tool } from '@/types';
import Link from 'next/link';
import { StarIcon, ComputerDesktopIcon, DevicePhoneMobileIcon, GlobeAltIcon } from '@heroicons/react/24/solid';

const getUnique = (arr: string[]) => Array.from(new Set(arr));

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
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
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-blue-100 flex flex-col h-full"
            >
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-blue-900 truncate">{tool.name}</h2>
                    <span className="flex items-center text-blue-500 text-sm">
                      <StarIcon className="h-5 w-5 mr-1" />
                      {tool.popularity}%
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{tool.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    {tool.platforms.map((platform) => (
                      <span key={platform.name} className="text-blue-400">
                        {platform.name === 'Windows' || platform.name === 'macOS' || platform.name === 'Linux' ? (
                          <ComputerDesktopIcon className="h-4 w-4" />
                        ) : platform.name === 'iOS' || platform.name === 'Android' ? (
                          <DevicePhoneMobileIcon className="h-4 w-4" />
                        ) : (
                          <GlobeAltIcon className="h-4 w-4" />
                        )}
                      </span>
                    ))}
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                    tool.pricing.type === 'Free' ? 'bg-blue-100 text-blue-700' :
                    tool.pricing.type === 'Paid' ? 'bg-blue-50 text-blue-500 border border-blue-200' :
                    'bg-blue-200 text-blue-900'
                  }`}>
                    {tool.pricing.type}
                  </span>
                </div>
              </div>
              {tool.imageUrl && (
                <div className="h-32 w-full bg-blue-100 flex items-center justify-center overflow-hidden border-t border-blue-50">
                  <img
                    src={tool.imageUrl}
                    alt={tool.name}
                    className="object-contain h-20"
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 