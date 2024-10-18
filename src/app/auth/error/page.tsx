import Image from 'next/image';
import Link from 'next/link';

export default function AuthErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-600">Authentication Error</h1>
                    <p className="mt-4 text-gray-600">
                        Oops! Something went wrong while trying to authenticate you.
                    </p>
                    <p className="mt-2 text-gray-600">
                        This might be due to invalid credentials or network issues.
                    </p>
                </div>

                <div className="mt-2 flex justify-center">
                    <Image
                        src={'https://imgs.search.brave.com/vIblpfDlSQOCcmb-crcHbx310HGpVzodkXbPybw-py0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA5/NTA0NzQ3Mi92ZWN0/b3IvZXJyb3ItcGFn/ZS1kZWFkLWVtb2pp/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9bUVBRXJBNTcy/Vi0tdFlYdkdZYU5j/Y2xBMTdib0ZZOFM4/VXdJZ09nQ1plaz0'} // Replace with your error image or icon
                        alt="Error Illustration"
                        height={250}
                        width={200}
                    />
                </div>

                <div className="mt-8 text-center space-y-4">
                    <Link href="/auth/login">
                        <p className="w-full inline-block bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition duration-300">
                            Try Again
                        </p>
                    </Link>

                    <Link href="/">
                        <p className="w-full inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-300">
                            Go to Homepage
                        </p>
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        If the issue persists, please contact our support team.
                    </p>
                </div>
            </div>
        </div>
    );
}
