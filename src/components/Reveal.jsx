import { useReveal } from '../hooks/useReveal';

// Wrap any block in <Reveal> to have it fade + rise into place the first
// time it scrolls into view. `delay` (ms) lets siblings stagger.
export default function Reveal({ children, delay = 0, style, as: Tag = 'div', ...rest }) {
  const { ref, visible } = useReveal();

  return (
    <Tag
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
