export default function ToolCard({ name, description, platforms, link }) {
  return (
    <div className="border rounded-xl shadow p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-xs text-blue-500 mb-1">지원 플랫폼: {platforms.join(', ')}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-indigo-600 underline"
      >
        자세히 보기
      </a>
    </div>
  );
}
