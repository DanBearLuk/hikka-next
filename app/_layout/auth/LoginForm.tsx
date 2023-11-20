'use client';

import { useAuthContext } from '@/utils/providers/AuthProvider';
import { useForm } from 'react-hook-form';
import login from '@/utils/api/auth/login';
import useRouter from '@/utils/useRouter';
import { setCookie } from '@/app/actions';
import { useEffect, useRef } from 'react';
import { useModalContext } from '@/utils/providers/ModalProvider';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';

type FormValues = {
    email: string;
    password: string;
};

const Component = () => {
    const captchaRef = useRef<TurnstileInstance>();
    const {
        login: loginModal,
        closeModals,
        switchModal,
    } = useModalContext();
    const {
        register,
        reset,
        handleSubmit,
        setFocus,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();
    const { setState: setAuth } = useAuthContext();
    const router = useRouter();

    const onSubmit = async (data: FormValues) => {
        try {
            if (captchaRef.current) {
                const res = await login({
                    ...data,
                    captcha: String(captchaRef.current.getResponse()),
                });
                setAuth((prev) => res);
                await setCookie('secret', res.secret);
                reset();
                closeModals();
                router.refresh();
                return;
            } else {
                throw Error('No captcha found');
            }
        } catch (e) {
            console.error(e);
            return;
        }
    };

    useEffect(() => {
        if (loginModal) {
            setFocus('email');
        }
    }, [open]);

    return (
        <>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full flex flex-col items-center gap-6"
            >
                <div className="w-full text-center flex flex-col items-center gap-4">
                    <div>
                        <h2 className="text-accent">👋 З поверненням!</h2>
                        <p className="text-neutral text-xs mt-2">
                            Будь ласка, зареєструйтесь, або авторизуйтесь.
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text-alt text-neutral">
                                Email
                            </span>
                        </label>
                        <input
                            type="email"
                            placeholder="Введіть пошту"
                            autoFocus
                            className="input bg-secondary/60 w-full"
                            {...register('email', { required: true })}
                        />
                    </div>
                    <div className="form-control w-full">
                        <div className="label">
                            <span className="label-text-alt text-neutral">
                                Пароль
                            </span>
                            <button
                                onClick={() => switchModal('forgotPassword')}
                            >
                                <span className="label-text-alt text-accent hover:underline w-fit">
                                    Забули пароль?
                                </span>
                            </button>
                        </div>
                        <input
                            type="password"
                            placeholder="Введіть пароль"
                            className="input bg-secondary/60 w-full"
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <label className="label">
                            <span className="label-text-alt text-neutral">
                                Не менше 6 символів, не менше 2 літер.
                            </span>
                        </label>
                    </div>
                    <Turnstile
                        ref={captchaRef}
                        siteKey="0x4AAAAAAANXs8kaCqjo_FLF"
                    />
                </div>
                <div className="w-full flex flex-col gap-4">
                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        type="submit"
                        className="btn btn-accent w-full"
                    >
                        {isSubmitting && (
                            <span className="loading loading-spinner"></span>
                        )}
                        Увійти
                    </button>
                    <button
                        disabled={isSubmitting}
                        onClick={() => switchModal('signup')}
                        className="btn btn-secondary w-full"
                    >
                        Реєстрація
                    </button>
                </div>
            </form>
        </>
    );
};

export default Component;
