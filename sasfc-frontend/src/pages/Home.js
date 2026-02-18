import { Hero } from '../components/sections/Hero';
import { UpcomingMatches } from '../components/sections/UpcomingMatches';
import { LatestNews } from '../components/sections/LatestNews';
import { Stats } from '../components/sections/Stats';
import { Sponsors } from '../components/sections/Sponsors';
// ...existing code...
export const Home = () => {
  return (
    <div className="space-y-16">
      <Hero />
      <UpcomingMatches />
      <LatestNews />
      <Stats />
      <Sponsors />
    </div>
  );
};