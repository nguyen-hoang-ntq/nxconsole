'use client';

import React from 'react';
import ErrorPage from '@/components/error/error-page';

export default function ForbiddenPage() {
  return (
    <ErrorPage 
      statusCode={403}
      showReportButton={false}
    />
  );
}
