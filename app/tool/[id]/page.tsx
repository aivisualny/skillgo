'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Tool } from '@/types';
import {
  StarIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  LinkIcon
} from '@heroicons/react/24/solid';

// 임시 데이터 (실제로는 API에서 가져올 것)
const mockTool: Tool = {
  id: '1',
  name: 'Adobe Premiere Pro',
  description: '전문적인 비디오 편집을 위한 업계 표준 소프트웨어입니다. 영화, TV, 웹용 콘텐츠 제작에 필요한 모든 도구를 제공합니다.',
  category: '비디오 편집',
  platforms: [
    { name: 'Windows', url: 'https://www.adobe.com/products/premiere/windows.html' },
    { name: 'macOS', url: 'https://www.adobe.com/products/premiere/mac.html' }
  ],
  popularity: 95,
  imageUrl: '/images/premiere-pro.jpg',
  tutorialUrl: 'https://www.adobe.com/kr/products/premiere/tutorials.html',
  features: [
    '타임라인 편집',
    '색보정',
    '오디오 편집',
    '효과 및 전환',
    '자동 자막 생성',
    '다중 카메라 편집',
    'VR 편집 지원'
  ],
  pricing: {
    type: 'Paid',
    price: 24.99,
    currency: 'USD'
  },
  tags: ['비디오 편집', '프로페셔널', 'Adobe', '영상 제작']
};

const featureCards = [
  {
    icon: '🎞️',
    title: '타임라인 편집',
    desc: '영상 조각들을 이어붙이고 순서를 조정할 수 있어요',
    gif: '/gifs/timeline-edit.gif',
  },
  {
    icon: '🎧',
    title: '오디오 편집',
    desc: '배경음악이나 내레이션을 추가할 수 있어요',
    gif: '/gifs/audio-edit.gif',
  },
  {
    icon: '🎨',
    title: '색보정',
    desc: '영상의 색감을 자연스럽게 바꿀 수 있어요',
    gif: '/gifs/color-edit.gif',
  },
];

export default function ToolDetailPage() {
  const params = useParams();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTool(mockTool);
      setLoading(false);
    }, 500);
  }, [params.id]);

  if (loading || !tool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-10 font-sans" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden p-8">
          {/* 상단 요약/라벨/환경/가격/언어 */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex flex-wrap gap-2 items-center mb-1">
              <span className="inline-block px-3 py-1 rounded-full bg-[#e6fbe6] text-[#1a4d2e] text-xs font-bold">입문자 추천</span>
              <span className="inline-block px-3 py-1 rounded-full bg-[#e9f0fb] text-[#2952e3] text-xs font-bold">전문 영상 편집자용</span>
              <span className="inline-block px-3 py-1 rounded-full bg-[#ffe6e6] text-[#7a1a1a] text-xs font-bold">영어-only</span>
            </div>
            <div className="text-lg font-bold text-blue-900 mb-1">🎯 단순 컷 편집 위주 영상 만들기 좋은 툴</div>
            <div className="flex flex-wrap gap-4 items-center text-sm text-blue-700">
              <span className="flex items-center gap-1"><ComputerDesktopIcon className="w-4 h-4" /> macOS/Windows</span>
              <span className="flex items-center gap-1">🇰🇷 한국어</span>
              <span className="flex items-center gap-1">💸 유료 (24.99USD/월)</span>
            </div>
          </div>

          {/* 헤더: 툴명/설명/로고 */}
          <div className="flex items-center gap-6 mb-8">
            {tool.imageUrl && (
              <div className="flex-shrink-0 w-24 h-24 bg-blue-50 rounded-xl flex items-center justify-center overflow-hidden border border-blue-100">
                <img src={tool.imageUrl} alt={tool.name} className="object-contain h-16" />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-blue-900 mb-1">{tool.name}</h1>
              <p className="text-gray-500 mb-2 text-sm">{tool.description}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center text-blue-500 text-sm font-medium">
                  <StarIcon className="h-5 w-5 mr-1" />
                  {tool.popularity}% 인기
                </span>
                <span className="inline-block px-2 py-1 text-xs rounded-full font-medium bg-blue-50 text-blue-500 border border-blue-200">
                  {tool.pricing.type === 'Paid' ? `${tool.pricing.price} ${tool.pricing.currency}/월` : tool.pricing.type}
                </span>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-500 border border-blue-100">{tool.category}</span>
              </div>
            </div>
          </div>

          {/* 작업 흐름 기반 단계별 안내 */}
          <div className="mb-8">
            <h2 className="text-base font-semibold text-blue-800 mb-2">🎬 기본 사용 흐름</h2>
            <ol className="list-decimal list-inside text-blue-900 text-sm space-y-1 pl-2">
              <li>영상 불러오기 / 생성하기</li>
              <li>오디오/자막 추가</li>
              <li>타임라인 편집</li>
              <li>색 보정 & 효과 추가</li>
              <li>파일 내보내기 (.mp4 등)</li>
            </ol>
          </div>

          {/* 기능 카드형 + 예시 영상 */}
          <div className="mb-8">
            <h2 className="text-base font-semibold text-blue-800 mb-3">주요 기능</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureCards.map(card => (
                <div key={card.title} className="flex flex-row items-center gap-4 bg-[#f5f7fa] rounded-xl p-4 shadow-sm">
                  <div className="text-3xl">{card.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-blue-900 mb-1">{card.title}</div>
                    <div className="text-sm text-[#3b4a6b] mb-1">{card.desc}</div>
                  </div>
                  {card.gif && (
                    <img src={card.gif} alt={card.title + ' 예시'} className="w-20 h-14 object-cover rounded-lg border" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 유사 툴 비교 링크 */}
          <div className="mb-8">
            <a href="/compare/premiere-vs-runwayml" className="inline-block text-blue-600 hover:text-blue-800 text-sm font-bold underline">🔄 이 툴과 RunwayML의 차이점 보기</a>
          </div>

          {/* 튜토리얼 + 난이도 */}
          {tool.tutorialUrl && (
            <div className="mb-8">
              <h2 className="text-base font-semibold text-blue-800 mb-2">튜토리얼</h2>
              <a
                href={tool.tutorialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium border border-blue-100 rounded-lg px-3 py-2 bg-blue-50"
              >
                <span>📘 초급</span>
                <LinkIcon className="h-4 w-4" />
                공식 튜토리얼 보기
              </a>
            </div>
          )}

          {/* 이런 분께 추천 */}
          <div className="mt-8">
            <h2 className="text-base font-semibold text-blue-800 mb-2">👩‍💻 이런 분께 추천해요</h2>
            <ul className="list-disc list-inside text-blue-900 text-sm space-y-1 pl-2">
              <li>유튜브 영상 컷 편집이 필요한 분</li>
              <li>한국어 프로젝트가 중요한 분</li>
              <li>색보정까지 하고 싶은 분</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 