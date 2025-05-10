export interface IPrivacyPolicy {
  _id?: string;
  content: string;
  lastUpdated: Date | string;
  publishedVersion: string;
  effectiveDate: Date | string;
  isPublished: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface PrivacyPolicyFormData {
  content: string;
  publishedVersion: string;
  effectiveDate: Date | string;
  isPublished: boolean;
  lastUpdated?: Date | string;
} 