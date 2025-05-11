import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '@radix-ui/react-label';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { EditProfileSchema } from './edit-profile-form';
import Dropzone from '@/components/ui/dropzone';

type EditProfileFormFieldsProps = {
  register: UseFormRegister<EditProfileSchema>;
  errors: FieldErrors<EditProfileSchema>;
  setImageUrl: (url: string) => void;
};

export const EditProfileFormFields = ({
  register,
  errors,
  setImageUrl
}: EditProfileFormFieldsProps) => (
  <>
    <div>
      <Label htmlFor="firstName">First Name</Label>
      <Input
        id="firstName"
        type="text"
        placeholder="Enter first name"
        {...register('firstName')}
      />
      {errors.firstName && (
        <p className="text-destructive text-sm">{errors.firstName.message}</p>
      )}
    </div>
    <div>
      <Label htmlFor="lastName">Last Name</Label>
      <Input
        id="lastName"
        type="text"
        placeholder="Enter last name"
        {...register('lastName')}
      />
      {errors.lastName && (
        <p className="text-destructive text-sm">{errors.lastName.message}</p>
      )}
    </div>
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="text"
        placeholder="Enter email"
        {...register('email')}
      />
      {errors.email && (
        <p className="text-destructive text-sm">{errors.email.message}</p>
      )}
    </div>
    <div>
      <Label htmlFor="image">Profile Picture</Label>
      <Dropzone />
    </div>
  </>
);
