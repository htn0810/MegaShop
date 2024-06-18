import MegaLoading from '@/components/ui/mega-loading'
import { Suspense, lazy } from 'react'

const MegaLazyLoad = (lazyComponent: Promise<any>) => {
  const LazyComponent = lazy(() => lazyComponent)
  return (
    <Suspense fallback={<MegaLoading />}>
      <LazyComponent />
    </Suspense>
  )
}

export default MegaLazyLoad
