'use client';
import React, { useState } from 'react';
import { X, CreditCard, Plus, Trash2 } from 'lucide-react';

interface PaymentMethod {
    id: string;
    type: 'credit' | 'debit';
    last4: string;
    expiryMonth: number;
    expiryYear: number;
    isDefault: boolean;
}

interface PaymentMethodsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddCard: (cardDetails: {
        number: string;
        expiryMonth: number;
        expiryYear: number;
        cvc: string;
    }) => Promise<void>;
    onRemoveCard: (cardId: string) => Promise<void>;
    onSetDefault: (cardId: string) => Promise<void>;
    paymentMethods: PaymentMethod[];
}

export default function PaymentMethodsModal({
    isOpen,
    onClose,
    onAddCard,
    onRemoveCard,
    onSetDefault,
    paymentMethods,
}: PaymentMethodsModalProps) {
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvc, setCvc] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAddCard = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!cardNumber || !expiryMonth || !expiryYear || !cvc) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setIsLoading(true);
            await onAddCard({
                number: cardNumber,
                expiryMonth: parseInt(expiryMonth),
                expiryYear: parseInt(expiryYear),
                cvc,
            });
            setIsAddingCard(false);
            setCardNumber('');
            setExpiryMonth('');
            setExpiryYear('');
            setCvc('');
        } catch (error) {
            setError('Failed to add card. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Existing Payment Methods */}
                <div className="space-y-4 mb-6">
                    {paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-gray-600" />
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {method.type === 'credit' ? 'Credit' : 'Debit'} Card ending in {method.last4}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {!method.isDefault && (
                                    <button
                                        onClick={() => onSetDefault(method.id)}
                                        className="text-sm text-[#00aeef] hover:text-blue-600"
                                    >
                                        Set as default
                                    </button>
                                )}
                                {method.isDefault && (
                                    <span className="text-sm text-green-600">Default</span>
                                )}
                                <button
                                    onClick={() => onRemoveCard(method.id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add New Card Form */}
                {isAddingCard ? (
                    <form onSubmit={handleAddCard} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef] focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                                <input
                                    type="text"
                                    value={expiryMonth}
                                    onChange={(e) => setExpiryMonth(e.target.value)}
                                    placeholder="MM"
                                    maxLength={2}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef] focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                                <input
                                    type="text"
                                    value={expiryYear}
                                    onChange={(e) => setExpiryYear(e.target.value)}
                                    placeholder="YY"
                                    maxLength={2}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef] focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                                <input
                                    type="text"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                    placeholder="123"
                                    maxLength={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef] focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setIsAddingCard(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-900"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-[#00aeef] text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Adding Card...' : 'Add Card'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => setIsAddingCard(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#00aeef] hover:text-[#00aeef] transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Card
                    </button>
                )}
            </div>
        </div>
    );
} 