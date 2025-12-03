import Alert from '@/Components/ui/Alert';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />

            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 px-4 py-12">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: '60px 60px',
                        }}
                    ></div>
                </div>

                {/* Animated Blobs */}
                <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-primary/30 blur-3xl"></div>
                <div
                    className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-accent/30 blur-3xl"
                    style={{ animationDelay: '1s' }}
                ></div>

                <Card className="relative z-10 w-full max-w-md border-2 border-primary/20 bg-base-100/95 shadow-2xl backdrop-blur-sm">
                    <CardHeader className="flex flex-col items-center justify-center pb-2">
                        {/* Logo/Icon */}
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center">
                            <img 
                                src="/images/logo.png" 
                                alt="Logo Kanwil Kemenag Prov. Papua" 
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <CardTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-2xl font-bold text-transparent">
                            Selamat Datang
                        </CardTitle>
                        <p className="mt-2 text-center text-xs text-base-content/60">Aplikasi Rekap Tahunan Link Konten Media Sosial</p>
                        <p className="text-center text-xs text-base-content/50">Kanwil Kemenag Prov. Papua</p>
                        <p className="mt-3 text-center text-sm text-base-content/60">Masuk ke akun Anda untuk melanjutkan</p>
                    </CardHeader>
                    <CardBody className="pt-6">
                        {status && (
                            <Alert variant="success" className="animate-fade-in mb-6">
                                {status}
                            </Alert>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            {/* Email Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                        <Mail className="h-5 w-5 text-base-content/40" />
                                    </div>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`input-bordered input w-full pr-4 pl-12 transition-all duration-200 focus:input-primary ${
                                            errors.email ? 'input-error' : ''
                                        }`}
                                        placeholder="nama@email.com"
                                        autoComplete="username"
                                        autoFocus
                                    />
                                </div>
                                {errors.email && (
                                    <label className="label">
                                        <span className="label-text-alt flex items-center gap-1 text-error">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.email}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Password Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                        <Lock className="h-5 w-5 text-base-content/40" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`input-bordered input w-full pr-12 pl-12 transition-all duration-200 focus:input-primary ${
                                            errors.password ? 'input-error' : ''
                                        }`}
                                        placeholder="Masukkan password"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 right-4 -translate-y-1/2 text-base-content/40 transition-colors hover:text-base-content"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <label className="label">
                                        <span className="label-text-alt flex items-center gap-1 text-error">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.password}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="checkbox checkbox-sm checkbox-primary"
                                    />
                                    <span className="label-text text-sm">Ingat saya</span>
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="link text-sm font-medium link-primary transition-colors hover:link-secondary"
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="form-control pt-2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="h-12 w-full text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
                                    loading={processing}
                                >
                                    {processing ? 'Memproses...' : 'Masuk'}
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
