import React, { useState } from 'react';
import { Copy, Check, Terminal, Play } from 'lucide-react';
import { DialectAlternative } from '../types';

interface SqlCodeBlockProps {
  sql: string;
  alternatives?: DialectAlternative[];
  title?: string;
  onRunQuery?: (sql: string) => void;
  isExecutable?: boolean;
}

export const SqlCodeBlock: React.FC<SqlCodeBlockProps> = ({
  sql,
  alternatives = [],
  title = 'SQL Query',
  onRunQuery,
  isExecutable = true,
}) => {
  const [selectedDialect, setSelectedDialect] = useState<string>('Standard');
  const [copied, setCopied] = useState<boolean>(false);

  const activeSql =
    selectedDialect === 'Standard'
      ? sql
      : alternatives.find((a) => a.dialect === selectedDialect)?.sql || sql;

  const activeNote =
    selectedDialect === 'Standard'
      ? null
      : alternatives.find((a) => a.dialect === selectedDialect)?.note;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="code-surface" style={{ marginBottom: '1rem' }}>
      {/* Code Header Bar */}
      <div className="code-surface-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Terminal size={14} color="#60a5fa" />
          <span className="code-surface-title">{title}</span>

          {alternatives.length > 0 && (
            <div style={{ display: 'flex', gap: '0.3rem', marginLeft: '0.5rem' }}>
              <button
                onClick={() => setSelectedDialect('Standard')}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '3px',
                  background: selectedDialect === 'Standard' ? '#1d4ed8' : '#1e293b',
                  color: selectedDialect === 'Standard' ? '#ffffff' : '#94a3b8',
                }}
              >
                Standard ANSI
              </button>
              {alternatives.map((alt) => (
                <button
                  key={alt.dialect}
                  onClick={() => setSelectedDialect(alt.dialect)}
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '3px',
                    background: selectedDialect === alt.dialect ? '#1d4ed8' : '#1e293b',
                    color: selectedDialect === alt.dialect ? '#ffffff' : '#94a3b8',
                  }}
                >
                  {alt.dialect}
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isExecutable && onRunQuery && (
            <button
              onClick={() => onRunQuery(activeSql)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.75rem',
                color: '#86efac',
                background: '#14532d',
                border: '1px solid #166534',
                padding: '0.2rem 0.55rem',
                borderRadius: '4px',
              }}
              title="Run query in live browser database"
            >
              <Play size={12} />
              Run Query
            </button>
          )}

          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.75rem',
              color: copied ? '#86efac' : '#cbd5e1',
              background: '#1e293b',
              padding: '0.2rem 0.55rem',
              borderRadius: '4px',
            }}
            title="Copy SQL Query"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <pre className="code-surface-body" style={{ margin: 0 }}>
        <code>{activeSql}</code>
      </pre>

      {/* Dialect Note if any */}
      {activeNote && (
        <div
          style={{
            padding: '0.45rem 0.85rem',
            background: '#1e293b',
            borderTop: '1px solid #334155',
            color: '#93c5fd',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <strong>Dialect Note ({selectedDialect}):</strong> {activeNote}
        </div>
      )}
    </div>
  );
};
