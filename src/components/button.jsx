import PropTypes from 'prop-types';
import { forwardRef, memo } from 'react';
import { twMerge } from 'tailwind-merge';

import { options } from '~/components/button/constant';
import Spinner from '~/components/spinner/spinner';

export const Button = (
    {
        text,
        loader,
        link,
        style,
        tooltip,
        onClick,
        border,
        uppercase,
        block,
        disabled,
        children = 'default children',
        className,
        color = 'primary',
        shape = 'pill',
        size = 'md',
        state = 'normal',
    },
    reference
) => {
    const isDisabled = loader ? true : disabled ? true : false;
    let extra_class =
        'round-none flex items-center justify-center relative focus:outline-none rounded-lg';
    if (!!uppercase) {
        extra_class += ' uppercase';
    }
    if (size === 'xs') {
        extra_class += ' h-5 px-6 text-xs';
    } else if (size === 'sm') {
        extra_class += '  h-7  px-6 text-base';
    } else if (size === 'lg') {
        extra_class += ' h-10  px-7';
    } else if (size === 'md') {
        extra_class += ' h-8 px-6 text-base';
    }
    if (text) {
        extra_class += ' text-gray-dark';
    } else {
        if (!!color && color === 'primary') {
            if (link) {
                extra_class += ' bg-transparent text-primary';
            } else if (border) {
                extra_class +=
                    ' bg-transparent text-primary border border-primary';
            } else {
                extra_class += ' bg-primary text-white';
            }
        } else if (!!color && color === 'secondary') {
            if (link) {
                extra_class += ' bg-transparent text-secondary';
            } else if (border) {
                extra_class +=
                    ' bg-transparent text-secondary border border-secondary';
            } else {
                extra_class += ' bg-secondary text-white';
            }
        } else if (!!color && color === 'warning') {
            if (link) {
                extra_class += ' bg-transparent text-warning';
            } else if (border) {
                extra_class +=
                    ' bg-transparent text-warning border border-warning';
            } else {
                extra_class += ' bg-warning text-white';
            }
        } else if (!!color && color === 'danger') {
            if (link) {
                extra_class += ' bg-transparent text-danger';
            } else if (border) {
                extra_class +=
                    ' bg-transparent text-danger border border-danger';
            } else {
                extra_class += ' bg-danger text-white';
            }
        } else if (!!color && color === 'success') {
            if (link) {
                extra_class += ' bg-transparent text-success';
            } else if (border) {
                extra_class +=
                    ' bg-transparent text-success border border-success';
            } else {
                extra_class += ' bg-success text-white';
            }
        } else {
            if (link) {
                extra_class += ' bg-transparent text-primary';
            } else if (border) {
                extra_class +=
                    ' bg-transparent text-gray-medium border border-gray-dark';
            } else {
                extra_class += ' bg-gray-lightest text-gray-medium';
            }
        }
    }
    if (block) {
        extra_class += ' w-full';
    } else {
        extra_class += ' block';
    }
    if (isDisabled) {
        extra_class += ' opacity-50 cursor-not-allowed';
    }
    if (shape === 'pill') {
        extra_class += ' rounded-full';
    } else if (shape === 'brick') {
        extra_class += ' rounded-none';
    }
    if (className) {
        extra_class += ` ${className}`;
    }

    return (
        <>
            <button
                onClick={onClick || null}
                disabled={isDisabled}
                className={twMerge(extra_class)}
                // ref={ref}
                title={tooltip}
                style={{
                    position: loader ? 'relative' : '',
                    ...(style || {}),
                }}
            >
                <div className="flex flex-row items-center justify-center text-center">
                    {children}
                    {!loader ? null : size === 'xs' ? (
                        <Spinner
                            className="absolute"
                            style={{
                                width: '12px',
                                height: '12px',
                                top: '4px',
                                right: '5px',
                            }}
                        />
                    ) : !loader ? null : size === 'sm' ? (
                        <Spinner
                            className="absolute"
                            style={{
                                width: '15px',
                                height: '15px',
                                top: '6px',
                                right: '5px',
                            }}
                        />
                    ) : size === 'lg' ? (
                        <Spinner
                            className="absolute"
                            style={{
                                width: '18px',
                                height: '18px',
                                top: '11px',
                                right: '5px',
                            }}
                        />
                    ) : (
                        <Spinner
                            className="absolute"
                            style={{
                                width: '16px',
                                height: '16px',
                                top: '8px',
                                right: '5px',
                            }}
                        />
                    )}
                </div>
            </button>
        </>
    );
};

Button.displayName = 'Button';

Button.propTypes = {
    color: PropTypes.oneOf(options.colors),
    shape: PropTypes.oneOf(options.shape),
    size: PropTypes.oneOf(options.size),
    weight: PropTypes.oneOf(options.weight),
    state: PropTypes.oneOf(options.state),
    children: PropTypes.node.isRequired,
    uppercase: PropTypes.bool,
    block: PropTypes.bool,
    disabled: PropTypes.disabled,
    loader: PropTypes.bool,
    link: PropTypes.bool,

    micro: PropTypes.bool,
    className: PropTypes.string,
    tooltip: PropTypes.string,

    border: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    text: PropTypes.string,
    onClick: PropTypes.func,

    style: PropTypes.object,
    ref: PropTypes.node,
};

export default memo(forwardRef(Button));
