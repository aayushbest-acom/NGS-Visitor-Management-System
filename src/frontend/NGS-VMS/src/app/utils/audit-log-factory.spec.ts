import { AuditLogFactory } from './audit-log-factory';

describe('AuditLogFactory', () => {
  it('should create an instance', () => {
    expect(new AuditLogFactory()).toBeTruthy();
  });
});
