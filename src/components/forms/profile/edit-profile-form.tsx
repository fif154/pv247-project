'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { EditProfileFormFields } from './edit-profile-form-fields';
import { EditUser } from '@/server/entities/models/user';
import { useEditUserMutation } from '@/mutations/users';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useSession } from 'next-auth/react';
const editProfileSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name is required',
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required',
  }),
  email: z.string().email(),
  image: z.string().url().optional()
});
export type EditProfileSchema = z.infer<typeof editProfileSchema>;

type EditProfileFormProps = {
  userInfo: EditUser;
  setModalOpen: (open: boolean) => void;
};

export const EditProfileForm = ({
  userInfo,
  setModalOpen,
}: EditProfileFormProps) => {
  const router = useRouter();
  const { mutateAsync: editUser, isPending: isEditPending } =
    useEditUserMutation();
  const { update } = useSession();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onSubmit = async (data: EditProfileSchema) => {
    console.log('data', data);
    await editUser(
      {
        userId: userInfo?.id ?? '',
        name: data.firstName + ' ' + data.lastName,
        email: data.email,
        image: imageUrl ?? undefined,
      },
      {
        onSuccess: () => {
          setModalOpen(false);
          setTimeout(async () => {
            await update({
              user: {
                name: data.firstName + ' ' + data.lastName,
                email: data.email,
                image: imageUrl ?? undefined,
              },
            });
            router.refresh();
          }, 100);
        },
      }
    );
  };

  const [firstName, lastName] = userInfo.name!.split(' ');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email: userInfo?.email ?? '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <EditProfileFormFields register={register} errors={errors} />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" variant="coral">
          {isEditPending ? <Spinner /> : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};
