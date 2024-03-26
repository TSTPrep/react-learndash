function SingleInstagram({ img, name }) {
    return (
        <div className='col-xl-2 col-md-4 col-sm-6'>
            <div className='instagram-grid'>
                <a href='#'>
                    <picture>
                        <img
                            src={`/assets/images/instagram/instagram-${img}.webp`}
                            alt='instagram'
                        />
                    </picture>
                    <span className='user-info'>
                        <span className='icon'>
                            <i className='icon-instagram'></i>
                        </span>
                        <span className='user-name'>{name}</span>
                    </span>
                </a>
            </div>
        </div>
    );
}

export default SingleInstagram;
