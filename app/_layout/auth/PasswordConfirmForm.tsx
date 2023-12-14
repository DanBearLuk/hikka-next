'use client';

import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useSearchParams } from 'next/navigation';

import { setCookie } from '@/app/actions';
import confirmPasswordReset from '@/utils/api/auth/confirmPasswordReset';
import { useAuthContext } from '@/utils/providers/AuthProvider';
import { useModalContext } from '@/utils/providers/ModalProvider';
import useRouter from '@/utils/useRouter';

type FormValues = {
    password: string;
    passwordConfirmation: string;
};

const Component = () => {
    const searchParams = useSearchParams();
    const { enqueueSnackbar } = useSnackbar();
    const {
        passwordConfirm,
        setState: setModalState,
        switchModal,
        closeModals,
    } = useModalContext();
    const {
        register,
        reset,
        handleSubmit,
        setFocus,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();
    const router = useRouter();
    const { setState: setAuth } = useAuthContext();

    const token = searchParams.get('token');

    const onSubmit = async (data: FormValues) => {
        try {
            if (data.passwordConfirmation !== data.password) {
                return;
            }

            const res = await confirmPasswordReset({
                password: data.password,
                token: String(token),
            });
            await setCookie('secret', res.secret);
            setAuth((prev) => res);
            reset();
            closeModals();
            router.push('/anime');
            enqueueSnackbar('Ви успішно змінили Ваш пароль.', {
                variant: 'success',
            });
            return;
        } catch (e) {
            console.error(e);
            return;
        }
    };

    useEffect(() => {
        if (passwordConfirm) {
            setFocus('password');
        }
    }, [open]);

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full flex-col items-center gap-6"
        >
            <div className="flex w-full flex-col items-center gap-4 text-center">
                <div>
                    <h2 className="text-accent">🔓 Відновити пароль</h2>
                    <p className="label-text-alt mt-2 opacity-60">
                        Будь ласка, введіть новий пароль.
                    </p>
                </div>
            </div>
            <div className="flex w-full flex-col gap-2">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Пароль</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Введіть пароль"
                        autoFocus
                        className="input w-full bg-secondary/60"
                        {...register('password', { required: true })}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Підтвердіть Пароль</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Повторіть пароль"
                        autoFocus
                        className="input w-full bg-secondary/60"
                        {...register('passwordConfirmation', {
                            required: true,
                        })}
                    />
                </div>
            </div>
            <div className="flex w-full flex-col gap-4">
                <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-accent w-full"
                >
                    {isSubmitting && (
                        <span className="loading loading-spinner"></span>
                    )}
                    Відновити
                </button>
            </div>
        </form>
    );
};

export default Component;
