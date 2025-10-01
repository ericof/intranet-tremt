import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withBlockExtensions from '@plone/volto/helpers/Extensions/withBlockExtensions';
import type { ClimaBlockData } from 'volto-tremt-intranet/components/Blocks/Clima/Data';
import cx from 'classnames';
import { getClimaData } from 'volto-tremt-intranet/actions/Clima/Clima';

interface ClimaBlockViewProps {
  data: ClimaBlockData;
  className?: string;
  isEditMode?: boolean;
  style?: React.CSSProperties;
}

const ClimaBlockView: React.FC<ClimaBlockViewProps> = ({
  data,
  className,
  style,
  isEditMode,
}) => {
  const loaded = useSelector((state: any) => state.climaData?.loaded || false);
  const previsao = useSelector((state: any) => state.climaData?.data || {});
  const events = previsao?.events;
  const sunrise = events?.sunrise ? events.sunrise : '';
  const sunset = events?.sunset ? events.sunset : '';
  const temperature = previsao?.temperature ? previsao.temperature.now : '';
  const weather = previsao?.weather ? previsao.weather : 'cloud';
  const measure = data?.measure ? data.measure : '';
  const location = data?.location ? data.location : 'Terra';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClimaData(location));
  }, [dispatch, location]);

  return (
    <div
      className={cx(
        'block climaBlock',
        `${className}`,
        isEditMode ? 'edit' : '',
      )}
      style={style}
    >
      <div className={'clima-wrapper'}>
        {loaded ? (
          <div className={'clima-card'}>
            <div className={`clima-icon ${weather}`}></div>
            <h1>{temperature}º</h1>
            <p className={'local'}>{location}</p>
            <p className={`evento ${measure}`}>
              {measure === 'sunrise' ? (
                <span>{sunrise}</span>
              ) : (
                <span>{sunset}</span>
              )}
            </p>
          </div>
        ) : (
          <div className={'loading'}>{'Please wait'}</div>
        )}
      </div>
    </div>
  );
};

export default withBlockExtensions(ClimaBlockView);
