'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { EditProfileFormFields } from './edit-macros-form-fields';
import { EditMacros } from '@/server/entities/models/user';
import { useEditMacrosMutation } from '@/mutations/users';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

const editMacrosSchema = z.object({
  fats: z.number().min(0),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  calories: z.number().min(0),
});
export type EditMacrosSchema = z.infer<typeof editMacrosSchema>;

type EditMacrosFormProps = {
  userInfo: EditMacros;
};

export const EditMacrosForm = ({ userInfo }: EditMacrosFormProps) => {
  const router = useRouter();
  const { mutateAsync: editMacros, isPending: isEditPending } =
    useEditMacrosMutation();

  const onSubmit = async (data: EditMacrosSchema) => {
    await editMacros(
      {
        userId: userInfo?.id ?? '',
        fats: data.fats,
        protein: data.protein,
        carbs: data.carbs,
        calories: data.calories,
      },
      {
        onSuccess: () => {
          setTimeout(async () => {
            router.refresh();
          }, 100);
        },
      }
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditMacrosSchema>({
    resolver: zodResolver(editMacrosSchema),
    defaultValues: {
      fats: userInfo?.fats ?? 0,
      protein: userInfo?.protein ?? 0,
      carbs: userInfo?.carbs ?? 0,
      calories: userInfo?.calories ?? 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <EditProfileFormFields register={register} errors={errors} />
      <Button type="submit" variant="coral">
        {isEditPending ? <Spinner /> : 'Save Changes'}
      </Button>
    </form>
  );
};
