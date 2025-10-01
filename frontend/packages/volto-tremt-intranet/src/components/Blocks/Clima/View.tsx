import React from 'react';
import withBlockExtensions from '@plone/volto/helpers/Extensions/withBlockExtensions';
import type { ClimaBlockData } from 'volto-tremt-intranet/components/Blocks/Clima/Data';
import cx from 'classnames';

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
  // Pointer para o local com os dados
  const previsao = {
    events: {
      sunrise: '08:00',
      sunset: '18:00',
    },
    temperature: {
      hourly: [],
      now: 29.1,
    },
    weather: 'sun',
  };
  const events = previsao?.events;
  const sunrise = events?.sunrise ? events.sunrise : '';
  const sunset = events?.sunset ? events.sunset : '';
  const temperature = previsao?.temperature ? previsao.temperature.now : '';
  const weather = previsao?.weather ? previsao.weather : 'cloud';
  const measure = data?.measure ? data.measure : '';
  const location = data?.location ? data.location : 'Terra';

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
      </div>
    </div>
  );
};

export default withBlockExtensions(ClimaBlockView);
