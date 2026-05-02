import { Metadata } from 'next';
import RaifuSakeChartClient from './RaifuSakeChartClient';
import DynamicBackButton from '@/components/layout/DynamicBackButton';

export const metadata: Metadata = {
  title: '来福酒造 銘柄ガイド | nom × nom',
  description: '来福酒造の日本酒を味わいの四象限マトリックスで分かりやすく解説します。',
  openGraph: {
    title: '来福酒造 銘柄ガイド | nom × nom',
    description: '来福酒造の日本酒を味わいの四象限マトリックスで分かりやすく解説します。',
  },
};

export default function RaifukuGuidePage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] relative pb-24">
      {/* Background radial gradients to match the original chart's aesthetic */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 20%, rgba(180,160,130,0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(100,130,160,0.06) 0%, transparent 60%)
          `
        }}
      />
      
      <div className="relative z-10 pt-16">
        <div className="container mx-auto px-6 mb-8">
          <DynamicBackButton defaultHref="/article" defaultText="BACK TO ARTICLES" />
        </div>
        
        <RaifuSakeChartClient />
      </div>
    </div>
  );
}
