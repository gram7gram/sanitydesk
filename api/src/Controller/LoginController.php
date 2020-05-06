<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{
    /**
     * @Route("/v1/login", methods={"POST"})
     */
    public function login(Request $request): JsonResponse
    {
        $em = $this->getDoctrine()->getManager();

        $content = json_decode($request->getContent(), true);
        if (!isset($content['username'])) {
            throw new BadRequestHttpException();
        }

        $user = $em->getRepository(User::class)->findOneBy([
            'username' => $content['username']
        ]);
        if (!$user) {
            throw new AccessDeniedHttpException("No such user");
        }

        return new JsonResponse([
            'accessToken' => $user->getAccessToken()
        ], JsonResponse::HTTP_OK);
    }

}