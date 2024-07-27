import { useRouter } from 'next/router';

export default function Result() {
  const router = useRouter();
  const { score } = router.query;

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Your Score</h1>
      <div className="flex justify-center items-center mt-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full">
            <circle cx="50%" cy="50%" r="45%" stroke="#d1d5db" strokeWidth="8" fill="none" />
            <circle cx="50%" cy="50%" r="45%" stroke="#4f46e5" strokeWidth="8" strokeDasharray={`${score * 2.83} ${282.6 - score * 2.83}`} fill="none" transform="rotate(-90 50 50)" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-xl font-semibold">
            <div className="text-4xl">{score}</div>
            <div className="text-sm">Out of 100</div>
          </div>
        </div>
      </div>
    </div>
  );
}
