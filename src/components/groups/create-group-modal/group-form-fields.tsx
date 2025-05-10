import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '../../ui/textarea';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { GroupFormSchema } from './group-form';

type GroupFormFieldsProps = {
  register: UseFormRegister<GroupFormSchema>;
  errors: FieldErrors<GroupFormSchema>;
};

export const GroupFormFields = ({ register, errors }: GroupFormFieldsProps) => (
  <>
    <div>
      <Label htmlFor="groupName">Group Name</Label>
      <Input
        id="groupName"
        type="text"
        placeholder="Enter group name"
        {...register('groupName')}
      />
      {errors.groupName && (
        <p className="text-destructive text-sm">{errors.groupName.message}</p>
      )}
    </div>
    <div>
      <Label htmlFor="groupDescription">Group Description</Label>
      <Textarea
        id="groupDescription"
        placeholder="Enter group description"
        {...register('groupDescription')}
      />
      {errors.groupDescription && (
        <p className="text-destructive text-sm">
          {errors.groupDescription.message}
        </p>
      )}
    </div>
  </>
);
