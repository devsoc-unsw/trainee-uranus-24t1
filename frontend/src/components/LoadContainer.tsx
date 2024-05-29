import { ReactNode } from "react";
import Skeleton from "./Skeleton";

interface LoadContainerProps {
  loading?: boolean;
  className?: string;
  children?: ReactNode;
}

const LoadContainer: React.FC<LoadContainerProps> = ({
  loading,
  className,
  children,
}) => {
  return loading ? (
    <div className={className}>
      <Skeleton />
    </div>
  ) : children;
};

export default LoadContainer;
