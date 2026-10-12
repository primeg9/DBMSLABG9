import React, { useState } from 'react';
import { Database, Key, Table as TableIcon, Layers, Play, RotateCcw, HelpCircle } from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudies';
import { CASE_STUDY_SCHEMAS } from '../data/datasets/schemas';
import { TableSchema, CaseStudyId } from '../types';
import { InteractiveSqlRunner } from '../components/InteractiveSqlRunner';
import { ActivePage } from '../components/Navbar';

interface DatabaseExplorerPageProps {
  onNavigate: (page: ActivePage, itemId?: string) => void;
}

export const DatabaseExplorerPage: React.FC<DatabaseExplorerPageProps> = ({ onNavigate }) => {
  const [activeCsId, setActiveCsId] = useState<CaseStudyId>('cs1');
  const activeSchemas = CASE_STUDY_SCHEMAS[activeCsId] || [];
  const [activeTableName, setActiveTableName] = useState<string>(activeSchemas[0]?.name || '');

  const activeTable =
    activeSchemas.find((s) => s.name === activeTableName) || activeSchemas[0];

  const handleSelectCaseStudy = (csId: CaseStudyId) => {
    setActiveCsId(csId);
    const newSchemas = CASE_STUDY_SCHEMAS[csId] || [];
    if (newSchemas.length > 0) {
      setActiveTableName(newSchemas[0].name);
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem 4rem' }}>
      {/* Header */}
      <div style={{ maxWidth: '820px', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-blue">Schema Inspector</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
            Course Code SEPBCAP1.7
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>
          Database Explorer
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Inspect the exact relational schemas, primary and foreign keys, column datatypes, and official sample records used across all four laboratory case studies.
        </p>
      </div>

      {/* Case Study Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        {CASE_STUDIES.map((cs) => {
          const isActive = activeCsId === cs.id;

          return (
            <button
              key={cs.id}
              onClick={() => handleSelectCaseStudy(cs.id)}
              style={{
                padding: '0.5rem 0.95rem',
                fontSize: '0.86rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                background: isActive ? 'var(--accent-primary)' : 'var(--bg-card)',
                color: isActive ? '#ffffff' : 'var(--text-main)',
                border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-light)'}`,
                whiteSpace: 'nowrap',
              }}
            >
              Case Study {cs.number}: {cs.databaseName}
            </button>
          );
        })}
      </div>

      {/* Table Selector Sub-tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {activeSchemas.map((table) => {
          const isSelected = activeTable?.name === table.name;

          return (
            <button
              key={table.name}
              onClick={() => setActiveTableName(table.name)}
              className={`badge ${isSelected ? 'badge-blue' : 'badge-neutral'}`}
              style={{
                fontSize: '0.85rem',
                padding: '0.4rem 0.8rem',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              <TableIcon size={14} />
              <span>{table.name}</span>
              <span style={{ opacity: 0.7, fontSize: '0.75rem', marginLeft: '0.2rem' }}>
                ({table.sampleRows.length} rows)
              </span>
            </button>
          );
        })}
      </div>

      {/* Table Metadata Card */}
      {activeTable && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="editorial-card" style={{ padding: '1.5rem', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  Table: <code>{activeTable.name}</code>
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                  {activeTable.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span className="badge badge-neutral">
                  {activeTable.columns.length} Columns
                </span>
                <span className="badge badge-neutral">
                  {activeTable.sampleRows.length} Sample Rows
                </span>
              </div>
            </div>

            {/* Questions using this table */}
            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)', fontSize: '0.84rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-subtle)' }}>Used In Questions: </span>
              {activeTable.usedInQuestions.map((qNum) => {
                const qId = `${activeCsId}-${qNum.toLowerCase()}`;
                return (
                  <button
                    key={qNum}
                    onClick={() => onNavigate('question-detail', qId)}
                    className="badge badge-blue"
                    style={{ marginLeft: '0.3rem', cursor: 'pointer' }}
                  >
                    {qNum}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Schema Column Definitions */}
          <section>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Column Definitions & Schema Constraints
            </h4>
            <div className="editorial-table-wrapper">
              <table className="editorial-table">
                <thead>
                  <tr>
                    <th>Column Name</th>
                    <th>Data Type</th>
                    <th>Key Constraints</th>
                    <th>Nullable</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTable.columns.map((col) => (
                    <tr key={col.name}>
                      <td style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
                        {col.name}
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontSize: '0.82rem' }}>
                        {col.type}
                      </td>
                      <td>
                        {col.isPrimaryKey && (
                          <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                            <Key size={10} /> PRIMARY KEY
                          </span>
                        )}
                        {col.isForeignKey && (
                          <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                            FOREIGN KEY ({col.references})
                          </span>
                        )}
                        {!col.isPrimaryKey && !col.isForeignKey && <span style={{ color: '#94a3b8' }}>—</span>}
                      </td>
                      <td>
                        {col.nullable ? (
                          <span style={{ color: '#16a34a', fontSize: '0.8rem' }}>YES</span>
                        ) : (
                          <span style={{ color: '#b91c1c', fontWeight: 600, fontSize: '0.8rem' }}>NOT NULL</span>
                        )}
                      </td>
                      <td style={{ fontSize: '0.82rem' }}>{col.description || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Sample Records Display */}
          <section>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Sample Records in <code>{activeTable.name}</code> ({activeTable.sampleRows.length} rows)
            </h4>
            <div className="editorial-table-wrapper">
              <table className="editorial-table">
                <thead>
                  <tr>
                    {activeTable.columns.map((col) => (
                      <th key={col.name}>{col.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeTable.sampleRows.map((row, idx) => (
                    <tr key={idx}>
                      {activeTable.columns.map((col) => {
                        const val = row[col.name];
                        return (
                          <td key={col.name} style={{ fontFamily: typeof val === 'number' ? 'var(--font-mono)' : 'inherit' }}>
                            {val === null ? <em style={{ color: '#94a3b8' }}>NULL</em> : String(val)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Live In-Browser Query Playground on this schema */}
          <section style={{ marginTop: '1rem' }}>
            <InteractiveSqlRunner
              initialSql={`SELECT * FROM ${activeTable.name};`}
            />
          </section>
        </div>
      )}
    </div>
  );
};
