import MegaLoading from '@/components/ui/mega-loading'
import { Suspense, lazy } from 'react'

// Define a type that matches what the dynamic import returns
type LazyComponentModule = {
  default: React.ComponentType<unknown>
}

const MegaLazyLoad = (lazyComponent: Promise<LazyComponentModule>) => {
  const LazyComponent = lazy(() => lazyComponent)
  return (
    <Suspense fallback={<MegaLoading />}>
      <LazyComponent />
    </Suspense>
  )
}

export default MegaLazyLoad
