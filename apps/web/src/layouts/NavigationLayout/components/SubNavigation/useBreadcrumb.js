import { RouterService } from "../../../../core/router";
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const getPathBlocks = (path) => {
    return path.split('/').filter(block => block !== '');
};
const isPathPure = (path) => {
    return !path.includes(':');
};
const buildTree = (items, params) => {
    const tree = {};
    for (const item of items) {
        const itemBlocks = getPathBlocks(item.key);
        let treeCheckpoint = tree;
        for (let index = 0; index < itemBlocks.length; index++) {
            const name = itemBlocks[index];
            const nameWithParam = RouterService.applyParamsToUrl(name, params);
            treeCheckpoint[name] = treeCheckpoint[name] ?? {
                name,
                nameWithParam,
                tree: {},
            };
            const isLast = index === itemBlocks.length - 1;
            if (isLast) {
                treeCheckpoint[name].item = item;
                treeCheckpoint[name].pathWithParams = RouterService.applyParamsToUrl(item.key, params);
            }
            else {
                treeCheckpoint = treeCheckpoint[name].tree;
            }
        }
    }
    return tree;
};
export const useBreadcrumb = ({ items }) => {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const [itemsBreadcrumbs, setItemsBreadcrumbs] = useState([]);
    const goTo = (url) => {
        router.push(url);
    };
    const tree = buildTree(items, params);
    const fromTreeToBreadcrumbItems = (tree, path) => {
        const pathWithParams = RouterService.restoreUrl(path, params);
        const blocks = getPathBlocks(pathWithParams);
        const items = [];
        let treeCheckpoint = tree;
        let treeNode;
        for (let index = 0; index < blocks.length + 1; index++) {
            const block = blocks[index];
            const blockNext = blocks[index + 1];
            treeNode = treeCheckpoint[block];
            if (!treeNode) {
                break;
            }
            if (treeNode.item) {
                const treeNodeNested = Object.values(treeNode.tree ?? {});
                const treeNodePure = treeNodeNested.filter(treeNode => isPathPure(treeNode.name) &&
                    treeNode.item &&
                    treeNode.nameWithParam !== blockNext);
                const menuItems = treeNodePure.map(treeNode => ({
                    ...treeNode.item,
                    onClick: () => {
                        goTo(treeNode.pathWithParams);
                    },
                }));
                if (blocks.length === 1 && menuItems.length === 0) {
                    continue;
                }
                const pathWithParam = treeNode.pathWithParams;
                const item = {
                    title: treeNode.item.label,
                    key: treeNode.item.key,
                    path: treeNode.item.key,
                    onClick: () => {
                        goTo(pathWithParam);
                    },
                };
                if (menuItems.length > 0) {
                    item.menu = { items: menuItems };
                }
                items.push(item);
            }
            treeCheckpoint = treeNode.tree;
        }
        return items;
    };
    useEffect(() => {
        setItemsBreadcrumbs(fromTreeToBreadcrumbItems(tree, pathname));
    }, [pathname]);
    return {
        items: itemsBreadcrumbs,
    };
};
