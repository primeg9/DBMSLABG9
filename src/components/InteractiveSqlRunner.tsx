import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, Database } from 'lucide-react';
import { executeSqlQuery, resetSqlDatabase, QueryExecutionResult } from '../lib/sqlEngine';
import { ResultTable } from './ResultTable';

interface InteractiveSqlRunnerProps {
  initialSql: string;
  onExecutionSuccess?: () => void;
}

export const InteractiveSqlRunner: React.FC<InteractiveSqlRunnerProps> = ({
  initialSql,
  onExecutionSuccess,
}) => {
  const [userSql, setUserSql] = useState<string>(initialSql);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<QueryExecutionResult | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  useEffect(() => {
    setUserSql(initialSql);
    setResult(null);
  }, [initialSql]);

  const handleRun = async () => {
    setIsRunning(true);
    setResetMessage(null);
    try {
      const res = await executeSqlQuery(userSql);
      setResult(res);
      if (!res.error && onExecutionSuccess) {
        onExecutionSuccess();
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setResult({
        columns: [],
        values: [],
        error: errMsg,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetDb = async () => {
    const success = await resetSqlDatabase();
    if (success) {
      setResetMessage('Database tables successfully restored to original sample state.');
      setResult(null);
      setTimeout(() => setResetMessage(null), 3500);
    }
  };

  const handleRestoreSql = () => {
    setUserSql(initialSql);
    setResult(null);
  };

  return (
    <div
      className="editorial-card"
      style={{
        padding: '1.25rem',
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        background: '#ffffff',
        border: '1px solid var(--border-medium)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database size={17} color="var(--accent-primary)" />
          <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
            In-Browser SQL Playground (Live SQLite Engine)
          </h4>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={handleRestoreSql}
            className="btn btn-secondary btn-sm"
            title="Reset text to verified solution SQL"
          >
            Reset Query Text
          </button>
          <button
            onClick={handleResetDb}
            className="btn btn-secondary btn-sm"
            style={{ color: '#b45309' }}
            title="Reset sample tables to initial rows"
          >
            <RotateCcw size={12} />
            Reset Sample Data
          </button>
        </div>
      </div>

      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
        Run this query or test your own SQL against the live in-memory database pre-loaded with all four case study tables.
      </p>

      {/* SQL Editor Textarea */}
      <div style={{ position: 'relative' }}>
        <textarea
          value={userSql}
          onChange={(e) => setUserSql(e.target.value)}
          rows={Math.max(4, userSql.split('\n').length + 1)}
          style={{
            width: '100%',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem',
            padding: '0.85rem',
            background: 'var(--bg-code)',
            color: 'var(--text-code)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-dark)',
            lineHeight: 1.5,
            resize: 'vertical',
            outline: 'none',
          }}
          placeholder="Enter SQL statement here..."
        />
      </div>

      {/* Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '0.6rem',
        }}
      >
        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
          Press <strong>Run Query</strong> to execute against the browser SQLite instance.
        </span>

        <button
          onClick={handleRun}
          disabled={isRunning}
          className="btn btn-primary btn-sm"
          style={{ padding: '0.45rem 1rem' }}
        >
          <Play size={14} />
          {isRunning ? 'Running...' : 'Execute SQL'}
        </button>
      </div>

      {/* Reset Notification */}
      {resetMessage && (
        <div
          style={{
            marginTop: '0.75rem',
            padding: '0.6rem 0.85rem',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '4px',
            color: '#166534',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <CheckCircle size={15} />
          {resetMessage}
        </div>
      )}

      {/* Execution Error Message */}
      {result?.error && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.85rem',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '4px',
            color: '#991b1b',
            fontSize: '0.84rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
          }}
        >
          <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>SQL Execution Error:</strong>
            <p style={{ margin: '0.2rem 0 0', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
              {result.error}
            </p>
          </div>
        </div>
      )}

      {/* Live Result Output */}
      {result && !result.error && (
        <div style={{ marginTop: '1rem' }}>
          <ResultTable
            output={{
              columns: result.columns,
              rows: result.values,
              isEmpty: result.values.length === 0,
              emptyReason: 'The query executed successfully and returned 0 rows from the live database.',
              isModification: result.isModification,
              modificationDetails: result.isModification
                ? {
                    table: 'Database State',
                    action: 'Execution',
                    beforeSummary: 'Previous state',
                    afterSummary: 'Updated rows successfully in browser SQLite',
                  }
                : undefined,
            }}
            title="Live Browser Execution Result"
            isLiveExecution={true}
            executionTimeMs={result.executionTimeMs}
          />
        </div>
      )}
    </div>
  );
};
