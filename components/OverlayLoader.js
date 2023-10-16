import { Vortex } from  'react-loader-spinner'
import { useSelector } from 'react-redux'

export default function OverlayLoader() {
  const isLoaderVisible = useSelector(state => state.app.isLoaderVisible)

  return (
    isLoaderVisible && 
      <div className="overlay">
        <div className="overlay-inner">
          <div className="overlay-content">
            <Vortex
              height="80"
              width="80"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
          </div>
        </div>
      </div>
  )
}