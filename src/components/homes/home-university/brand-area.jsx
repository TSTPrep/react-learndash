import React from 'react';

const brands = [
    '/assets/images/brand/brand-01.png',
    '/assets/images/brand/brand-02.png',
    '/assets/images/brand/brand-03.png',
    '/assets/images/brand/brand-04.png',
    '/assets/images/brand/brand-05.png',
    '/assets/images/brand/brand-06.png',
];

const BrandArea = () => {
    return (
        <div className='edu-brand-area brand-area-4 gap-lg-bottom-equal'>
            <div className='container'>
                <div className='brand-grid-wrap brand-style-2'>
                    {brands.map((img, i) => (
                        <div key={i} className='brand-grid'>
                            <picture>
                                <img src={img} alt='Brand Logo' />
                            </picture>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandArea;
