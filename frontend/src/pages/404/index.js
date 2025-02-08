import { Fragment } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import { Helmet } from 'react-helmet';
import { Button } from 'components/Button';
import DecoderText from 'components/DecoderText';
import Notfound from 'assets/notfound.mp4';
import NotfoundPoster from 'assets/notfound.jpg';
import { reflow } from 'utils/transition';
import Heading from 'components/Heading';
import Text from 'components/Text';
import './index.css';

function NotFound() {
  return (
    <section className="page-404">
      <Helmet>
        <title tag="title">404 | Not Found</title>
        <meta name="description" content="404 page not found. This page doesn't exist" />
      </Helmet>
      <Transition appear in={true} timeout={0} onEnter={reflow}>
        {status => (
          <Fragment>
            <div className="page-404__details">
              <div className="page-404__text">
                <Heading
                  className={classNames('page-404__title', `page-404__title--${status}`)}
                  level={0}
                >
                  404
                </Heading>
               
                <Text
                  className={classNames(
                    'page-404__description',
                    `page-404__description--${status}`
                  )}
                >
                  This page could not be found. It either doesn’t exist or was deleted. Or
                  perhaps you don’t exist.
                </Text>
                <Button
                  secondary
                  iconHoverShift
                  className={classNames(
                    'page-404__button',
                    `page-404__button--${status}`
                  )}
                  href="/"
                  icon="chevronRight"
                >
                  Back to homepage
                </Button>
              </div>
            </div>

            <div
              className={classNames(
                'page-404__video-container',
                `page-404__video-container--${status}`
              )}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className={classNames('page-404__video', `page-404__video--${status}`)}
                poster={NotfoundPoster}
              >
                <source src={Notfound} type="video/mp4" />
              </video>
            
            </div>
          </Fragment>
        )}
      </Transition>
    </section>
  );
}

export default NotFound;
