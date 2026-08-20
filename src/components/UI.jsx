import { colors, fonts } from '../theme';
import { useCountUp } from '../hooks/useCountUp';

export function Pill({ children }) {
  return (
    <span
      style={{
        padding: '6px 12px',
        border: `1px solid ${colors.pillBorder}`,
        borderRadius: 100,
        fontSize: 12,
        fontFamily: fonts.mono,
        color: colors.inkSoft,
      }}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, style }) {
  return (
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 12,
        letterSpacing: 2,
        color: colors.amber,
        marginBottom: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Stat({ value, label, valueColor }) {
  const { ref, display } = useCountUp(value);
  return (
    <div ref={ref}>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 19,
          fontWeight: 600,
          color: valueColor || colors.amber,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          color: colors.inkMuted,
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function Card({ children, style, ...rest }) {
  return (
    <div
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 6,
        padding: 28,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
