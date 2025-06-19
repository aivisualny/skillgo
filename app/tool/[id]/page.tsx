'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Tool } from '@/types';
import type { ExtendedTool } from '@/data/tools';
import {
  StarIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  LinkIcon,
  PlayIcon,
  ClockIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  FolderIcon,
  MicrophoneIcon,
  ScissorsIcon,
  PaintBrushIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/solid';

import { tools } from '@/data/tools';

export default function ToolDetailPage() {
  const params = useParams();
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const tool = tools.find(t => t.id === String(params?.id)) as ExtendedTool | undefined;

  useEffect(() => {
    if (!params?.id) return;
    setLoading(true);
    fetch(`/api/tool/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setApiData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params?.id]);

  if (!tool) return <div className="min-h-screen flex items-center justify-center">존재하지 않는 툴입니다.</div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;

  const reviews = apiData?.user_reviews || apiData?.reviews || [];
  const samples = apiData?.sample_videos || apiData?.samples || [];
  const recommendList = tool.recommendList || [
    '✅ 이런 분께 추천해요',
    '🎓 영상 편집이 처음인 분',
    '💻 무료 체험 먼저 해보고 싶은 분'
  ];

  return (
    <div className="min-h-screen bg-blue-50 py-10 font-sans" style={{fontFamily: 'Noto Sans KR, Inter, sans-serif'}}>
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더 섹션 */}
        <div
          className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden mb-8 cursor-pointer hover:shadow-2xl transition-shadow duration-200"
          onClick={() => {
            if (tool.platforms && tool.platforms[0]?.url) {
              window.open(tool.platforms[0].url, '_blank');
            }
          }}
        >
          <div className="p-8">
            {/* 상단 라벨들 */}
            <div className="flex flex-wrap gap-2 items-center mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#e6fbe6] text-[#1a4d2e] text-xs font-bold">입문자 추천</span>
              <span className="inline-block px-3 py-1 rounded-full bg-[#e9f0fb] text-[#2952e3] text-xs font-bold">전문 영상 편집자용</span>
              <span className="inline-block px-3 py-1 rounded-full bg-[#ffe6e6] text-[#7a1a1a] text-xs font-bold">영어-only</span>
            </div>
            
            {/* 메인 헤더 */}
            <div className="flex items-start gap-6 mb-6">
              {tool.imageUrl && (
                <div className="flex-shrink-0 w-32 h-32 bg-blue-50 rounded-xl flex items-center justify-center overflow-hidden border border-blue-100">
                  <img src={tool.imageUrl} alt={tool.name} className="object-contain h-24" />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-blue-900 mb-2">{tool.name}</h1>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">{tool.description}</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center text-blue-500 text-sm font-medium">
                    <StarIcon className="h-5 w-5 mr-1" />
                    {tool.popularity}% 인기
                  </span>
                  <span className="inline-block px-3 py-1 text-sm rounded-full font-medium bg-blue-50 text-blue-500 border border-blue-200">
                    {tool.pricing.type === 'Paid' ? `${tool.pricing.price} ${tool.pricing.currency}/월` : tool.pricing.type}
                  </span>
                  <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-500 border border-blue-100">{tool.category}</span>
                </div>
              </div>
            </div>

            {/* 핵심 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 text-blue-700">
                <ComputerDesktopIcon className="w-5 h-5" />
                <span className="text-sm">macOS/Windows</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <GlobeAltIcon className="w-5 h-5" />
                <span className="text-sm">🇰🇷 한국어</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <CurrencyDollarIcon className="w-5 h-5" />
                <span className="text-sm">💸 유료 (24.99USD/월)</span>
              </div>
            </div>

            {/* 요약 */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="text-lg font-bold text-blue-900 mb-1">🎯 단순 컷 편집 위주 영상 만들기 좋은 툴</div>
              <p className="text-blue-700 text-sm">전문적인 영상 편집이 필요한 분들을 위한 업계 표준 소프트웨어입니다. 타임라인 편집부터 색보정, 오디오 편집까지 모든 기능을 제공합니다.</p>
            </div>
          </div>
        </div>

        {/* 상세 정보 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽 컬럼 - 주요 기능 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 작업 흐름 */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
              <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                <PlayIcon className="w-6 h-6" />
                기본 사용 흐름
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <FolderIcon className="w-5 h-5" />
                      영상 불러오기 / 생성하기
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">프로젝트를 생성하고 편집할 영상 파일을 불러옵니다. 다양한 포맷을 지원하니까 걱정 마세요!</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <MicrophoneIcon className="w-5 h-5" />
                      오디오/자막 추가
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">배경음악, 내레이션, 자막 등을 추가하여 영상을 풍부하게 만듭니다. 자동 자막 기능도 있어요!</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <ScissorsIcon className="w-5 h-5" />
                      타임라인 편집
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">영상 조각들을 이어붙이고 순서를 조정하여 원하는 구성으로 만듭니다. 드래그 앤 드롭으로 쉽게!</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <PaintBrushIcon className="w-5 h-5" />
                      색 보정 & 효과 추가
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">영상의 색감을 자연스럽게 조정하고 다양한 효과를 적용합니다. 전문가처럼 보이게 만들어요!</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <DocumentArrowDownIcon className="w-5 h-5" />
                      파일 내보내기
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">편집이 완료된 영상을 MP4, MOV 등 원하는 포맷으로 내보냅니다. 유튜브에 바로 업로드 가능!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 주요 기능 상세 */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
              <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6" />
                주요 기능
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <span className="text-2xl">🎞️</span>
                      타임라인 편집
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">영상 조각들을 이어붙이고 순서를 조정할 수 있어요. 컷 편집, 크로스페이드, 슬로우모션 등 다양한 편집 기법을 지원합니다.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <span className="text-2xl">🎧</span>
                      오디오 편집
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">배경음악이나 내레이션을 추가할 수 있어요. 오디오 믹싱, 노이즈 제거, 이퀄라이저 기능을 제공합니다.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <span className="text-2xl">🎨</span>
                      색보정
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">영상 색감을 밝고 예쁘게 바꿀 수 있어요. Lumetri Color 패널을 통해 전문적인 색보정이 가능합니다.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <span className="text-2xl">✨</span>
                      효과 및 전환
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">다양한 비디오 효과와 전환 효과를 제공합니다. 블러, 글로우, 왜곡 효과부터 페이드, 슬라이드 전환까지 지원합니다.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <span className="text-2xl">📝</span>
                      자동 자막 생성
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">AI 기반 자동 자막 생성 기능을 제공합니다. 음성을 텍스트로 변환하고 자동으로 자막을 생성할 수 있어요!</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <span className="text-2xl">🎥</span>
                      다중 카메라 편집
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">여러 카메라에서 촬영된 영상을 동시에 편집할 수 있습니다. 카메라 전환을 쉽게 할 수 있는 기능을 제공합니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 유사 툴 비교 */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
              <h2 className="text-xl font-bold text-blue-900 mb-4">🔄 유사 툴 비교</h2>
              <a href="/compare/premiere-vs-runwayml" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-lg font-semibold underline">
                이 툴과 RunwayML의 차이점 보기 →
              </a>
              <p className="text-gray-600 text-sm mt-2">다른 영상 편집 도구들과의 비교를 통해 최적의 선택을 도와드립니다.</p>
            </div>
          </div>

          {/* 오른쪽 컬럼 - 부가 정보 */}
          <div className="space-y-8">
            {/* 튜토리얼 */}
            {tool.tutorialUrl && (
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
                <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <AcademicCapIcon className="w-5 h-5" />
                  튜토리얼
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">📘 초급</span>
                    <span className="text-gray-600">난이도</span>
                  </div>
                  <a
                    href={tool.tutorialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium border border-blue-200 rounded-lg px-4 py-2 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <LinkIcon className="h-4 w-4" />
                    🧑‍🏫 영상 보면서 따라하기
                  </a>
                  <p className="text-gray-600 text-xs">Adobe에서 제공하는 공식 튜토리얼을 통해 기본 사용법을 익힐 수 있습니다.</p>
                </div>
              </div>
            )}

            {/* 추천 체크리스트 */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-6">
              <h2 className="text-lg font-bold text-blue-900 mb-4">👩‍💻 이런 분께 추천해요</h2>
              <ul className="space-y-2">
                {recommendList.map((item, idx) => (
                  <li key={idx} className="text-base flex items-center gap-2">{item}</li>
                ))}
              </ul>
            </div>

            {/* 샘플 영상 */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-6">
              <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">🎬 예시 영상</h2>
              {samples.length === 0 ? (
                <div className="text-gray-400">예시 영상이 아직 없습니다.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {samples.map((sample: any, idx: number) => (
                    <div key={idx} className="w-full aspect-video rounded-lg overflow-hidden border">
                      <iframe
                        src={typeof sample === 'string' ? sample : sample.url}
                        title={sample.desc || `샘플 영상 ${idx+1}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <div className="text-xs text-center mt-1 text-gray-600">{sample.desc || ''}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 후기 */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-6">
              <h2 className="text-lg font-bold text-blue-900 mb-4">💬 사용자 후기</h2>
              {reviews.length === 0 ? (
                <div className="text-gray-400">아직 후기가 없습니다.</div>
              ) : (
                <ul className="space-y-3">
                  {reviews.map((review: any, idx: number) => (
                    <li key={idx} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      {typeof review === 'string' ? (
                        <span className="text-blue-900 text-base">{review}</span>
                      ) : (
                        <>
                          <div className="text-blue-900 text-base">{review.content}</div>
                          <div className="text-xs text-blue-800 mt-1">{review.source}</div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 시스템 요구사항 */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
              <h2 className="text-lg font-bold text-blue-900 mb-4">💻 시스템 요구사항</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-blue-900 text-sm mb-1">운영체제</h3>
                  <p className="text-gray-600 text-sm">Windows 10 (64비트) 이상, macOS 10.15 이상</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 text-sm mb-1">메모리</h3>
                  <p className="text-gray-600 text-sm">최소 8GB RAM (16GB 권장)</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 text-sm mb-1">저장공간</h3>
                  <p className="text-gray-600 text-sm">최소 8GB 사용 가능한 디스크 공간</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 text-sm mb-1">그래픽</h3>
                  <p className="text-gray-600 text-sm">DirectX 12 호환 그래픽 카드 (2GB VRAM 권장)</p>
                </div>
              </div>
            </div>

            {/* 가격 정보 */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
              <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <CurrencyDollarIcon className="w-5 h-5" />
                가격 정보
              </h2>
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="text-lg font-bold text-blue-900">${tool.pricing.price} {tool.pricing.currency}/월</div>
                  <div className="text-sm text-blue-700">Creative Cloud 개별 앱</div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>• 7일 무료 체험 제공</p>
                  <p>• 연간 결제 시 할인 혜택</p>
                  <p>• 학생/교사 할인 가능</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 