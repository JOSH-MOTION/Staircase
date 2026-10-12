import type { OrderStatus } from '../lib/orders';

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`order-status order-status-${status}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
