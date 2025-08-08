'use client';

import React from 'react';
import ErrorPage from '@/components/error/error-page';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <ErrorPage 
      statusCode={500}
      title="Something went wrong"
      description="An unexpected error occurred. Our team has been notified and is working to resolve the issue."
      showReportButton={true}
    />
  );
}
