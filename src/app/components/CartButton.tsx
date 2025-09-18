import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const CartButton = ({
  totalItems,
  isOnTop,
}: {
  totalItems: number;
  isOnTop: boolean;
}) => (
  <Link href="/store/cart" className="relative">
    <ShoppingCart
      className={`w-6 h-6 ${
        isOnTop ? "text-white" : "text-gray-700 dark:text-gray-300"
      }`}
    />
    {totalItems > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {totalItems}
      </span>
    )}
  </Link>
);

export default CartButton;