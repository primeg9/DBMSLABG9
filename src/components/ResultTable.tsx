import React from 'react';
import { Table, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { QuestionOutput } from '../types';

interface ResultTableProps {
  output: QuestionOutput;
  title?: string;
  isLiveExecution?: boolean;
  executionTimeMs?: number;
}

export const ResultTable: React.FC<ResultTableProps> = ({
  output,
  title = 'Expected Output (Verified against Sample Data)',
  isLiveExecution = false,
  executionTimeMs,
}) => {
  const { columns, rows, isEmpty, emptyReason, isModification, modificationDetails } = output;

  return (
    <div style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Table size={16} color="var(--accent-primary)" />
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {title}
          </h4>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {isLiveExecution && executionTimeMs !== undefined && (
            <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
              Execution: {executionTimeMs} ms
            </span>
          )}
          <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
            {isEmpty ? '0 rows' : `${rows.length} ${rows.length === 1 ? 'row' : 'rows'}`}
          </span>
        </div>
      </div>

      {/* Case 1: DDL or DML Modification Output */}
      {isModification && modificationDetails && (
        <div
          className="editorial-card"
          style={{
            padding: '1rem',
            borderLeft: '4px solid #16a34a',
            background: '#fcfdfd',
            marginBottom: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <CheckCircle2 size={18} color="#16a34a" />
            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#166534' }}>
              Database State Modification ({modificationDetails.action})
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '1rem',
              alignItems: 'center',
              padding: '0.75rem',
              background: '#f8fafc',
              borderRadius: '4px',
              border: '1px solid #e2e8f0',
              fontSize: '0.84rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600 }}>
                Initial State
              </span>
              <p style={{ margin: '0.2rem 0 0', color: '#334155', fontWeight: 500 }}>
                {modificationDetails.beforeSummary}
              </p>
            </div>
            <ArrowRight size={18} color="#94a3b8" />
            <div>
              <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#166534', fontWeight: 600 }}>
                After Execution
              </span>
              <p style={{ margin: '0.2rem 0 0', color: '#166534', fontWeight: 500 }}>
                {modificationDetails.afterSummary}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Case 2: Empty Result Set */}
      {isEmpty ? (
        <div
          className="editorial-card"
          style={{
            padding: '1.25rem',
            borderLeft: '4px solid #f59e0b',
            background: '#fffdfa',
          }}
        >
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <AlertCircle size={20} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#b45309', marginBottom: '0.3rem' }}>
                Empty Set (0 rows returned)
              </h5>
              <p style={{ fontSize: '0.84rem', color: '#78350f', margin: 0, lineHeight: 1.5 }}>
                {emptyReason ||
                  'The query executed successfully without syntax errors, but zero records in the current sample database satisfy the filter condition.'}
              </p>
            </div>
          </div>

          {columns.length > 0 && (
            <div style={{ marginTop: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 600 }}>
                Projected Columns (Empty Table Structure):
              </span>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.3rem', flexWrap: 'wrap' }}>
                {columns.map((c) => (
                  <span key={c} className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Case 3: Regular Non-Empty Output Table */
        <div className="editorial-table-wrapper">
          <table className="editorial-table">
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} style={{ fontFamily: typeof cell === 'number' ? 'var(--font-mono)' : 'inherit' }}>
                      {cell === null ? (
                        <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.8rem' }}>NULL</span>
                      ) : (
                        String(cell)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
