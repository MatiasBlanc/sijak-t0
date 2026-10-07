import { IndexMark } from './IndexMark';

export interface DetailItem {
  title: string;
  body: string;
}

interface DetailListProps {
  items: readonly DetailItem[];
  className?: string;
  itemClassName?: string;
  indexClassName?: string;
}

/** Lista numerada con título y texto, para pilares u otros bloques explicativos. */
export function DetailList({
  items,
  className,
  itemClassName,
  indexClassName,
}: DetailListProps) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={item.title} className={itemClassName}>
          <IndexMark index={index} className={indexClassName} />
          <div>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
