'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import '../../../i18n';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../../../components/LanguageSwitcher';

export default function RegisterPage() {
    const { t } = useTranslation('common');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        FirstName: '',
        LastName: '',
        Birthday: '',
        Language: '',
        Number: '',
        IssuingDate: '',
        Expiry: '',
    });

    const [disabilityCard, setDisabilityCard] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const router = useRouter();
    const params = useParams();
    const locale = typeof params.locale === 'string' ? params.locale : 'en';


    useEffect(() => {
        if (i18n.language !== locale) {
            i18n.changeLanguage(locale);
        }
    }, [locale]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setDisabilityCard(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const registerRes = await axios.post('http://localhost:1337/api/auth/local/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            const jwt = registerRes.data.jwt;
            const userId = registerRes.data.user.id;

            await axios.put(
                `http://localhost:1337/api/users/${userId}`,
                {
                    FirstName: formData.FirstName,
                    LastName: formData.LastName,
                    Birthday: formData.Birthday,
                    Language: formData.Language,
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            if (disabilityCard) {
                const uploadData = new FormData();
                uploadData.append('files', disabilityCard);

                const uploadRes = await axios.post(
                    'http://localhost:1337/api/upload',
                    uploadData,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                const uploadedFile = uploadRes.data[0];

                await axios.post(
                    'http://localhost:1337/api/disability-cards',
                    {
                        data: {
                            Number: formData.Number,
                            IssuingDate: formData.IssuingDate,
                            Expiry: formData.Expiry,
                            ReviewStatus: 'unreviewed',
                            Proof: uploadedFile.id,
                            users_permissions_user: userId,
                        },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
            }

            router.push(`/${locale}/events`);
        } catch (err: any) {
            console.error(err);
            setMessage(err.response?.data?.error?.message || 'Registration failed. Please check your input.');
        }
    };

    return (
        <div className="register-page">
            <div
                className="form-container"
                style={{ maxWidth: '700px', width: '100%' }}
            >
                <LanguageSwitcher />
                <h1>{t('register')}</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder={t('username')} onChange={handleChange} required />
                    <input type="email" name="email" placeholder={t('email')} onChange={handleChange} required />
                    <input type="password" name="password" placeholder={t('password')} onChange={handleChange} required />
                    <input type="text" name="FirstName" placeholder={t('firstName')} onChange={handleChange} required />
                    <input type="text" name="LastName" placeholder={t('lastName')} onChange={handleChange} required />
                    <input type="date" name="Birthday" onChange={handleChange} required />

                    <label htmlFor="Number">{t('cardNumber')}</label>
                    <input
                        type="text"
                        name="Number"
                        placeholder={t('cardNumberPlaceholder')}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="IssuingDate">{t('issuingDate')}</label>
                    <input type="date" name="IssuingDate" onChange={handleChange} required />

                    <label htmlFor="Expiry">{t('expiryDate')}</label>
                    <input type="date" name="Expiry" onChange={handleChange} required />

                    <label htmlFor="disability_card">{t('disabilityCard')}</label>
                    <div
                        style={{
                            border: '2px dashed #0077cc',
                            borderRadius: '8px',
                            padding: '1.2rem',
                            marginBottom: '1.2rem',
                            backgroundColor: '#eef6ff',
                            textAlign: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <input
                            type="file"
                            name="disability_card"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="fileUpload"
                        />
                        <label htmlFor="fileUpload" style={{ cursor: 'pointer' }}>
                            📄 {disabilityCard?.name || t('uploadYourCard')}
                        </label>
                    </div>

                    <button type="submit">{t('signUp')}</button>
                </form>
                {message && <p className="error-message">{message}</p>}
            </div>
        </div>
    );
}
