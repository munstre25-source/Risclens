'use client';

import React from 'react';
import { ComplianceTool } from '@/lib/compliance-tools';
import { getContextualLinks } from '@/lib/pseo-internal-links';

interface SmartContentProps {
  content: string;
  tools?: ComplianceTool[];
  className?: string;
}

export function SmartContent({ content, tools = [], className = '' }: SmartContentProps) {
  // We use dangerouslySetInnerHTML because getContextualLinks returns a string with <a> tags
  const linkedContent = getContextualLinks(content, tools);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: linkedContent }}
    />
  );
}
