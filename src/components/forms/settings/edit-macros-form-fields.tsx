import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '@radix-ui/react-label';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { EditMacrosSchema } from './edit-macros-form';

type EditProfileFormFieldsProps = {
  register: UseFormRegister<EditMacrosSchema>;
  errors: FieldErrors<EditMacrosSchema>;
};

export const EditProfileFormFields = ({
  register,
  errors,
}: EditProfileFormFieldsProps) => (
  <>
    <div>
      <Label htmlFor="calories">Calories</Label>
      <Input
        id="calories"
        type="number"
        placeholder="Enter calories"
        {...register('calories', { valueAsNumber: true })}
      />
      {errors.calories && (
        <p className="text-destructive text-sm">{errors.calories.message}</p>
      )}
    </div>
    <div>
      <Label htmlFor="carbs">Carbs</Label>
      <Input
        id="carbs"
        type="number"
        placeholder="Enter carbs"
        {...register('carbs', { valueAsNumber: true })}
      />
      {errors.carbs && (
        <p className="text-destructive text-sm">{errors.carbs.message}</p>
      )}
    </div>
    <div>
      <Label htmlFor="protein">Protein</Label>
      <Input
        id="protein"
        type="number"
        placeholder="Enter protein"
        {...register('protein', { valueAsNumber: true })}
      />
      {errors.protein && (
        <p className="text-destructive text-sm">{errors.protein.message}</p>
      )}
    </div>
    <div>
      <Label htmlFor="fats">Fat</Label>
      <Input
        id="fats"
        type="number"
        placeholder="Enter fats"
        {...register('fats', { valueAsNumber: true })}
      />
      {errors.fats && (
        <p className="text-destructive text-sm">{errors.fats.message}</p>
      )}
    </div>
  </>
);
