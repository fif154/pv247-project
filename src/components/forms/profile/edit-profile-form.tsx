'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useEditUserMutation } from '@/mutations/users';
import { EditUser } from '@/server/entities/models/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EditProfileFormFields } from './edit-profile-form-fields';
const editProfileSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name is required',
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required',
  }),
  email: z.string().email(),
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

  const onSubmit = async (data: EditProfileSchema) => {
    await editUser(
      {
        userId: userInfo?.id ?? '',
        name: data.firstName + ' ' + data.lastName,
        email: data.email,
      },
      {
        onSuccess: () => {
          setModalOpen(false);
          setTimeout(async () => {
            await update({
              user: {
                name: data.firstName + ' ' + data.lastName,
                email: data.email,
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
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="coral">
          {isEditPending ? <Spinner /> : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};
