import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../lib/UserContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, role, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && role !== 'admin' && role !== 'editor') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
