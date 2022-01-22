const ICON_MAP = {
    1: {
        icon: 'icon-fast-food-outline'
    },
    2: {
        icon: 'icon-shopping-cart-2-line'
    },
    3: {
        icon: 'icon-swap'
    },
    4: {
        icon: 'icon-capsule-fill'
    },
    5: {
        icon: 'icon-bus-fill'
    },
    6: {
        icon: 'icon-movie'
    },
    7: {
        icon: 'icon-user-heart'
    },
    8: {
        icon: 'icon-book-open'
    },
    9: {
        icon: 'icon-gift-fill'
    },
    10: {
        icon: 'icon-funds-fill'
    }

    // 4: {
    //     icon: 'icon-capsule-fill'
    // }
}

export const REFRESH_STATE = {
    normal: 0, // 普通
    pull: 1, // 下拉刷新（未满足刷新条件）
    drop: 2, // 释放立即刷新（满足刷新条件）
    loading: 3, // 加载中
    success: 4, // 加载成功
    failure: 5, // 加载失败
};

export const LOAD_STATE = {
    normal: 0, // 普通
    abort: 1, // 中止
    loading: 2, // 加载中
    success: 3, // 加载成功
    failure: 4, // 加载失败
    complete: 5, // 加载完成（无新数据）
};

export default {
    ICON_MAP,
    REFRESH_STATE,
    LOAD_STATE
}
