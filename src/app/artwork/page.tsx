import { Suspense } from 'react';
import { PageState } from '../components/PageStateProps';
import ArtistPortfolioContent from '../components/ArtistPortfolioContent';

const ArtistPortfolioPage = () => {
  return (
    <Suspense fallback={<PageState type="loading" message="Carregando..." />}>
      <ArtistPortfolioContent />
    </Suspense>
  );
};

export default ArtistPortfolioPage;