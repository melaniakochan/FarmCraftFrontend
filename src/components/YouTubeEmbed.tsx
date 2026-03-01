import React from 'react';
import { YouTubeEmbedProps } from '@/types';

export const YouTubeEmbed = ({ url }: YouTubeEmbedProps) => {
    if (!url) return null;

    // Helper to convert standard or short URLs to the embed format
    const getEmbedUrl = (videoUrl: string) => {
        try {
            const urlObj = new URL(videoUrl);
            let videoId = '';

            if (urlObj.hostname === 'youtu.be') {
                videoId = urlObj.pathname.slice(1);
            } else {
                videoId = urlObj.searchParams.get('v') || '';
            }

            return `https://www.youtube.com/embed/${videoId}`;
        } catch (e) {
            return null;
        }
    };

    const embedUrl = getEmbedUrl(url);

    if (!embedUrl) return (
        <p className="text-xs text-red-400 italic">Invalid YouTube URL</p>
    );

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-4 tracking-widest">
                Video Tutorial
            </h3>
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-100 shadow-inner bg-black">
                <iframe
                    className="w-full h-full"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};